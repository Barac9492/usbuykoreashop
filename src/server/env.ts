import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  BASE_URL: z.string().url().optional(),
  BASE_URL_OTHER_PORT: z.string().url().optional(),
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
  OPENROUTER_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
