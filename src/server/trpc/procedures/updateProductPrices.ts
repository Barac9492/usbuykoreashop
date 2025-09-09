import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { chromium } from "playwright";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const updateProductPrices = baseProcedure
  .input(z.object({ 
    productId: z.number().optional(), // If not provided, update all products
    forceUpdate: z.boolean().default(false), // Force update even if recently updated
  }))
  .mutation(async ({ input, ctx }) => {
    const isInternal = (ctx as any)?.internal === true;
    if (!isInternal && (!ctx.user || ctx.user.role !== "admin")) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }
    try {
      // Get products to update
      const products = await db.product.findMany({
        where: input.productId ? { id: input.productId } : {},
        include: {
          prices: {
            include: {
              store: true,
            },
          },
        },
      });

      const results = [];
      const browser = await chromium.launch();

      for (const product of products) {
        for (const price of product.prices) {
          // Skip if recently updated (within last hour) unless forced
          if (!input.forceUpdate) {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            if (price.lastUpdated > oneHourAgo) {
              continue;
            }
          }

          try {
            const scrapedPrice = await scrapeProductPrice(browser, price.productUrl, price.store.name);
            
            if (scrapedPrice) {
              // Update the price in database
              await db.productPrice.update({
                where: { id: price.id },
                data: {
                  price: scrapedPrice.price,
                  isAvailable: scrapedPrice.isAvailable,
                  lastUpdated: new Date(),
                },
              });

              results.push({
                productId: product.id,
                productName: product.name,
                store: price.store.name,
                country: price.country,
                oldPrice: price.price,
                newPrice: scrapedPrice.price,
                updated: true,
              });
            }
          } catch (error) {
            console.error(`Failed to scrape price for ${product.name} at ${price.store.name}:`, error);
            results.push({
              productId: product.id,
              productName: product.name,
              store: price.store.name,
              country: price.country,
              error: error instanceof Error ? error.message : 'Unknown error',
              updated: false,
            });
          }
        }
      }

      await browser.close();

      return {
        success: true,
        message: `Updated prices for ${results.filter(r => r.updated).length} products`,
        results,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update product prices: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });

async function scrapeProductPrice(browser: any, productUrl: string, storeName: string) {
  const page = await browser.newPage();
  
  try {
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto(productUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    let price = null;
    let isAvailable = true;

    // Store-specific scraping logic
    if (storeName.toLowerCase().includes('sephora')) {
      // Sephora US scraping logic
      try {
        const priceElement = await page.waitForSelector('[data-at="price_current"], .css-0', { timeout: 10000 });
        const priceText = await priceElement?.textContent();
        if (priceText) {
          const match = priceText.match(/\$(\d+(?:\.\d{2})?)/);
          if (match) {
            price = parseFloat(match[1]);
          }
        }
      } catch (e) {
        // Fallback selectors for Sephora
        const fallbackSelectors = ['.css-1g5t3xq', '.price', '[class*="price"]'];
        for (const selector of fallbackSelectors) {
          try {
            const element = await page.$(selector);
            if (element) {
              const text = await element.textContent();
              const match = text?.match(/\$(\d+(?:\.\d{2})?)/);
              if (match) {
                price = parseFloat(match[1]);
                break;
              }
            }
          } catch (e) {
            continue;
          }
        }
      }
    } else if (storeName.toLowerCase().includes('ulta')) {
      // Ulta Beauty scraping logic
      try {
        const priceElement = await page.waitForSelector('.ProductPricing', { timeout: 10000 });
        const priceText = await priceElement?.textContent();
        if (priceText) {
          const match = priceText.match(/\$(\d+(?:\.\d{2})?)/);
          if (match) {
            price = parseFloat(match[1]);
          }
        }
      } catch (e) {
        // Fallback for Ulta
        const fallbackSelectors = ['.price', '[class*="price"]', '[class*="Price"]'];
        for (const selector of fallbackSelectors) {
          try {
            const element = await page.$(selector);
            if (element) {
              const text = await element.textContent();
              const match = text?.match(/\$(\d+(?:\.\d{2})?)/);
              if (match) {
                price = parseFloat(match[1]);
                break;
              }
            }
          } catch (e) {
            continue;
          }
        }
      }
    } else if (storeName.toLowerCase().includes('olive young')) {
      // Olive Young Korea scraping logic
      try {
        const priceElement = await page.waitForSelector('.prd_price', { timeout: 10000 });
        const priceText = await priceElement?.textContent();
        if (priceText) {
          const match = priceText.match(/(\d{1,3}(?:,\d{3})*)/);
          if (match) {
            price = parseFloat(match[1].replace(/,/g, ''));
          }
        }
      } catch (e) {
        // Fallback for Olive Young
        const fallbackSelectors = ['.price', '[class*="price"]', '.won'];
        for (const selector of fallbackSelectors) {
          try {
            const element = await page.$(selector);
            if (element) {
              const text = await element.textContent();
              const match = text?.match(/(\d{1,3}(?:,\d{3})*)/);
              if (match) {
                price = parseFloat(match[1].replace(/,/g, ''));
                break;
              }
            }
          } catch (e) {
            continue;
          }
        }
      }
    } else {
      // Generic scraping logic for other stores
      const selectors = [
        '.price', '[class*="price"]', '[class*="Price"]',
        '.cost', '[class*="cost"]', '[class*="Cost"]',
        '.amount', '[class*="amount"]', '[class*="Amount"]'
      ];
      
      for (const selector of selectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            const text = await element.textContent();
            // Try to match USD price
            const usdMatch = text?.match(/\$(\d+(?:\.\d{2})?)/);
            if (usdMatch) {
              price = parseFloat(usdMatch[1]);
              break;
            }
            // Try to match KRW price
            const krwMatch = text?.match(/(\d{1,3}(?:,\d{3})*)/);
            if (krwMatch) {
              price = parseFloat(krwMatch[1].replace(/,/g, ''));
              break;
            }
          }
        } catch (e) {
          continue;
        }
      }
    }

    // Check availability
    const unavailableKeywords = ['out of stock', 'sold out', '품절', 'unavailable'];
    const pageContent = await page.textContent('body');
    if (pageContent) {
      isAvailable = !unavailableKeywords.some(keyword => 
        pageContent.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return price ? { price, isAvailable } : null;
  } catch (error) {
    console.error(`Error scraping ${productUrl}:`, error);
    return null;
  } finally {
    await page.close();
  }
}
