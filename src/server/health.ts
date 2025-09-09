import { defineEventHandler } from "@tanstack/react-start/server";

export default defineEventHandler(() => {
  return new Response(
    JSON.stringify({ status: "ok", uptime: process.uptime() }),
    { headers: { "Content-Type": "application/json" } },
  );
});

