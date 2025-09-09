import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { addProductByUrl } from "~/server/trpc/procedures/addProductByUrl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const file = process.argv[2] || path.resolve(__dirname, "../../../data/products.json");
  if (!fs.existsSync(file)) {
    console.error(`Input file not found: ${file}`);
    console.error(`Create it from data/products.json.example`);
    process.exit(1);
  }
  const input = JSON.parse(fs.readFileSync(file, "utf-8")) as Array<{
    category: string;
    brand?: string;
    model?: string;
    korea?: { name: string; url: string };
    us?: { name: string; url: string };
  }>;

  let ok = 0;
  for (const item of input) {
    try {
      const res = await addProductByUrl.handler({
        input: item,
        type: "mutation",
        path: "addProductByUrl",
        // Bypass HTTP by calling handler directly with an admin ctx
        ctx: {
          user: { id: -1, email: "admin@local", role: "admin", status: "verified", country: "US" },
        } as any,
      });
      console.log(`Added product #${res.productId} (${item.brand ?? ""} ${item.model ?? ""})`);
      ok++;
      // Small delay to be nice to stores
      await new Promise((r) => setTimeout(r, 2000));
    } catch (e: any) {
      console.error(`Failed to add product: ${item.brand ?? ""} ${item.model ?? ""}:`, e?.message ?? e);
    }
  }
  console.log(`Done. Successfully added ${ok}/${input.length}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

