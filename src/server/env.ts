import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).optional(),
  BASE_URL: z.string().url().optional(),
  BASE_URL_OTHER_PORT: z.string().url().optional(),
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters").optional(),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters").optional(),
  OPENROUTER_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.warn("[env] Invalid/missing env vars detected. Falling back to safe defaults for non-critical runtime.");
}

export const env = {
  NODE_ENV: (process.env.NODE_ENV as "development" | "production") ?? "production",
  BASE_URL: process.env.BASE_URL,
  BASE_URL_OTHER_PORT: process.env.BASE_URL_OTHER_PORT,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "change-me-admin",
  JWT_SECRET: process.env.JWT_SECRET ?? "change-me-jwt-secret-please",
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
};
