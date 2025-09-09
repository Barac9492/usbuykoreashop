import {
  createCallerFactory,
  createTRPCRouter,
  baseProcedure,
} from "~/server/trpc/main";
import { getProductComparisons } from "./procedures/getProductComparisons";
import { getCategories } from "./procedures/getCategories";
import { scrapeProduct } from "./procedures/scrapeProduct";
import { updateProductPrices } from "./procedures/updateProductPrices";
import { triggerPriceUpdate } from "./procedures/triggerPriceUpdate";
import { register } from "./procedures/register";
import { login } from "./procedures/login";
import { applyAsShopper } from "./procedures/applyAsShopper";
import { createPurchaseRequest } from "./procedures/createPurchaseRequest";
import { whoami } from "./procedures/whoami";

export const appRouter = createTRPCRouter({
  getProductComparisons,
  getCategories,
  scrapeProduct,
  updateProductPrices,
  triggerPriceUpdate,
  register,
  login,
  applyAsShopper,
  createPurchaseRequest,
  whoami,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
