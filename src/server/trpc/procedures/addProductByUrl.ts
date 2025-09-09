import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { chromium } from "playwright";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

const StoreInput = z.object({ name: z.string(), url: z.string().url() });

async function scrapeDetails(browser: any, store: { name: string; url: string }) {
  const page = await browser.newPage();
  await page.goto(store.url, { waitUntil: "domcontentloaded", timeout: 30000 });
  const lower = store.name.toLowerCase();

  // Defaults
  let name: string | null = null;
  let price: number | null = null;
  let currency = "USD";
  let imageUrl: string | null = null;
  let isAvailable = true;

  try {
    if (lower.includes("sephora")) {
      name = (await page.locator("h1, [data-at=\"product_name\"]").first().textContent())?.trim() || null;
      const text = (await page.locator("[data-at=price_current], .css-0, .price").first().textContent()) || "";
      const m = text.match(/\$(\d+(?:\.\d{2})?)/);
      if (m) price = parseFloat(m[1]);
      currency = "USD";
      imageUrl = await page.locator("img").first().getAttribute("src");
    } else if (lower.includes("ulta")) {
      name = (await page.locator("h1, .Text_ProductTitle").first().textContent())?.trim() || null;
      const text = (await page.locator(".ProductPricing, [data-at=price]").first().textContent()) || "";
      const m = text.match(/\$(\d+(?:\.\d{2})?)/);
      if (m) price = parseFloat(m[1]);
      currency = "USD";
      imageUrl = await page.locator("img").first().getAttribute("src");
    } else if (lower.includes("oliveyoung")) {
      name = (await page.locator("h1, .prod-title").first().textContent())?.trim() || null;
      const text = (await page.locator(".price, .total-price, .pay-price").first().textContent()) || "";
      const m = text.replaceAll(",", "").match(/(\d+[\.]?\d*)/);
      if (m) price = parseFloat(m[1]);
      currency = "KRW";
      imageUrl = await page.locator("img").first().getAttribute("src");
    } else if (lower.includes("coupang") || lower.includes("gmarket")) {
      name = (await page.locator("h1").first().textContent())?.trim() || null;
      const text = (await page.locator(".price, .sale, strong, em").first().textContent()) || "";
      const m = text.replaceAll(",", "").match(/(\d+[\.]?\d*)/);
      if (m) price = parseFloat(m[1]);
      currency = "KRW";
      imageUrl = await page.locator("img").first().getAttribute("src");
    } else {
      // Fallback: first number on page as price (best-effort)
      const text = (await page.locator("body").textContent()) || "";
      const m = text.match(/(\$|₩)\s?(\d+[\.]?\d*)/);
      if (m) {
        price = parseFloat(m[2]);
        currency = m[1] === "₩" ? "KRW" : "USD";
      }
      name = (await page.locator("title").textContent())?.trim() || null;
      imageUrl = await page.locator("img").first().getAttribute("src");
    }
  } catch (e) {
    isAvailable = false;
  } finally {
    await page.close();
  }

  if (!name || price == null) {
    throw new Error(`Could not scrape ${store.name}`);
  }
  return { name, price, currency, imageUrl, isAvailable };
}

export const addProductByUrl = baseProcedure
  .input(
    z.object({
      category: z.string().min(1),
      korea: StoreInput.optional(),
      us: StoreInput.optional(),
      brand: z.string().optional(),
      model: z.string().optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    if (process.env.SCRAPING_ENABLED !== "true") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message:
          "Scraping is disabled in this environment. Run locally with Playwright (pnpm seed:products) or set SCRAPING_ENABLED=true on a suitable runtime.",
      });
    }
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    if (!input.korea && !input.us) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Provide at least one store URL" });
    }

    const browser = await chromium.launch();
    try {
      // Scrape details (prefer Korea for product meta)
      const primary = input.korea ?? input.us!;
      const details = await scrapeDetails(browser, primary);

      // Ensure category
      const category = await db.category.upsert({
        where: { name: input.category },
        create: { name: input.category },
        update: {},
      });

      // Create product
      const product = await db.product.create({
        data: {
          name: details.name,
          description: null,
          imageUrl: details.imageUrl ?? null,
          brand: input.brand ?? null,
          model: input.model ?? null,
          categoryId: category.id,
        },
      });

      // Helper to ensure store and price row
      async function upsertPrice(country: "Korea" | "US", s: { name: string; url: string }) {
        const d = await scrapeDetails(browser, s);
        const store = await db.store.upsert({
          where: { name: s.name },
          update: { website: new URL(s.url).origin, country },
          create: { name: s.name, country, website: new URL(s.url).origin },
        });
        await db.productPrice.create({
          data: {
            productId: product.id,
            country,
            price: d.price,
            currency: d.currency,
            storeId: store.id,
            productUrl: s.url,
            isAvailable: d.isAvailable,
          },
        });
      }

      if (input.korea) await upsertPrice("Korea", input.korea);
      if (input.us) await upsertPrice("US", input.us);

      return { success: true, productId: product.id };
    } finally {
      await browser.close();
    }
  });
