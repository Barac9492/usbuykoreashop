import { createFileRoute } from "@tanstack/react-router";
import { Steps } from "~/components/Steps";
import { TrustBadges } from "~/components/TrustBadges";

export const Route = createFileRoute("/how-it-works")({
  component: Page,
});

function Page() {
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">How it works</h1>
          <p className="section-subtitle">Shop from Korea in three simple steps</p>
        </div>
      </header>
      <Steps />
      <TrustBadges />
    </div>
  );
}

