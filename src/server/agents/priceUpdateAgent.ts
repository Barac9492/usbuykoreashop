import { db } from "~/server/db";
import { updateProductPrices } from "~/server/trpc/procedures/updateProductPrices";

export class PriceUpdateAgent {
  private isRunning = false;
  private intervalId: NodeJS.Timeout | null = null;
  private readonly UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  private readonly BATCH_SIZE = 5; // Process 5 products at a time to avoid overwhelming stores

  constructor() {
    console.log("PriceUpdateAgent initialized");
  }

  start() {
    if (this.isRunning) {
      console.log("PriceUpdateAgent is already running");
      return;
    }

    this.isRunning = true;
    console.log("Starting PriceUpdateAgent...");

    // Run immediately on start
    this.runUpdate();

    // Set up recurring updates
    this.intervalId = setInterval(() => {
      this.runUpdate();
    }, this.UPDATE_INTERVAL);

    console.log(`PriceUpdateAgent started with ${this.UPDATE_INTERVAL / 1000 / 60} minute intervals`);
  }

  stop() {
    if (!this.isRunning) {
      console.log("PriceUpdateAgent is not running");
      return;
    }

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    console.log("PriceUpdateAgent stopped");
  }

  private async runUpdate() {
    if (!this.isRunning) {
      return;
    }

    console.log("PriceUpdateAgent: Starting price update cycle...");

    try {
      // Get products that need price updates (not updated in the last 2 hours)
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      
      const productsNeedingUpdate = await db.product.findMany({
        include: {
          prices: {
            where: {
              lastUpdated: {
                lt: twoHoursAgo,
              },
            },
            include: {
              store: true,
            },
          },
        },
        take: this.BATCH_SIZE,
      });

      if (productsNeedingUpdate.length === 0) {
        console.log("PriceUpdateAgent: All prices are up to date");
        return;
      }

      console.log(`PriceUpdateAgent: Updating prices for ${productsNeedingUpdate.length} products`);

      // Update prices for each product
      for (const product of productsNeedingUpdate) {
        if (!this.isRunning) {
          console.log("PriceUpdateAgent: Stopping due to shutdown signal");
          break;
        }

        try {
          console.log(`PriceUpdateAgent: Updating prices for ${product.name}`);
          
          // Call the updateProductPrices procedure
          const result = await updateProductPrices.handler({
            input: { productId: product.id, forceUpdate: false },
            ctx: { internal: true },
            type: "mutation",
            path: "updateProductPrices",
          });

          console.log(`PriceUpdateAgent: Updated ${product.name}:`, result.message);
          
          // Add a small delay between products to be respectful to the stores
          await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay
          
        } catch (error) {
          console.error(`PriceUpdateAgent: Failed to update prices for ${product.name}:`, error);
        }
      }

      console.log("PriceUpdateAgent: Price update cycle completed");

    } catch (error) {
      console.error("PriceUpdateAgent: Error during update cycle:", error);
    }
  }

  // Method to manually trigger an update
  async triggerUpdate(productId?: number) {
    console.log(`PriceUpdateAgent: Manual update triggered${productId ? ` for product ${productId}` : ' for all products'}`);
    
    try {
      const result = await updateProductPrices.handler({
        input: { productId, forceUpdate: true },
        ctx: { internal: true },
        type: "mutation",
        path: "updateProductPrices",
      });

      console.log("PriceUpdateAgent: Manual update completed:", result.message);
      return result;
    } catch (error) {
      console.error("PriceUpdateAgent: Manual update failed:", error);
      throw error;
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      updateInterval: this.UPDATE_INTERVAL,
      batchSize: this.BATCH_SIZE,
    };
  }
}

// Create a singleton instance
export const priceUpdateAgent = new PriceUpdateAgent();
