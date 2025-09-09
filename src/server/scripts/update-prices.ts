import { updateProductPrices } from "~/server/trpc/procedures/updateProductPrices";

async function main() {
  const res = await updateProductPrices.handler({
    input: { forceUpdate: true },
    type: "mutation",
    path: "updateProductPrices",
    ctx: { internal: true } as any,
  });
  console.log(res.message);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

