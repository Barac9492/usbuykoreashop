import { baseProcedure } from "~/server/trpc/main";

export const getConfig = baseProcedure.query(async () => {
  return {
    scrapingEnabled: process.env.SCRAPING_ENABLED === "true",
  } as const;
});

