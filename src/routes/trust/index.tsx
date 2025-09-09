import { createFileRoute } from "@tanstack/react-router";
import { TrustBadges } from "~/components/TrustBadges";

export const Route = createFileRoute("/trust")({
  component: Page,
});

function Page() {
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">Trust & Safety</h1>
          <p className="section-subtitle">Escrow, verification, and transparent policies</p>
        </div>
      </header>
      <section className="py-16">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Escrow-first</h2>
          <p className="text-gray-700 mb-8">Your funds are held in escrow until you confirm delivery. If something goes wrong, we make it right.</p>
          <h2 className="text-2xl font-semibold mb-4">Verified shoppers</h2>
          <p className="text-gray-700 mb-8">Shoppers undergo ID verification and ongoing quality checks. Poor performance results in removal.</p>
          <h2 className="text-2xl font-semibold mb-4">Dispute resolution</h2>
          <p className="text-gray-700">Clear timelines and communication. Most issues resolve within 72 hours.</p>
        </div>
      </section>
      <TrustBadges />
    </div>
  );
}

