import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "~/components/Testimonials";

export const Route = createFileRoute("/about")({
  component: Page,
});

function Page() {
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">Our story</h1>
          <p className="section-subtitle">Bringing Seoul’s storefronts to your screen</p>
        </div>
      </header>
      <section className="py-16">
        <div className="section-container max-w-3xl">
          <p className="text-gray-700 mb-6">We started with a simple idea: make it as easy—and safe—as possible to buy authentic Korean products from anywhere. Verified shoppers on the ground, escrow for trust, and a modern experience for both sides.</p>
          <p className="text-gray-700">Our promise is authenticity, transparency, and speed. The result: prices that feel local and a process that feels effortless.</p>
        </div>
      </section>
      <Testimonials />
    </div>
  );
}

