import { createFileRoute } from "@tanstack/react-router";
import { PricingTable } from "~/components/PricingTable";
import { TrustBadges } from "~/components/TrustBadges";

export const Route = createFileRoute("/pricing")({
  component: Page,
});

function Page() {
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">Pricing</h1>
          <p className="section-subtitle">Transparent fees and fair shipping</p>
        </div>
      </header>
      <PricingTable />
      <TrustBadges />
    </div>
  );
}

