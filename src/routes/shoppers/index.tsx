import { createFileRoute } from "@tanstack/react-router";
import { Steps } from "~/components/Steps";

export const Route = createFileRoute("/shoppers")({
  component: Page,
});

function Page() {
  const points = [
    { title: "Earn from local knowledge", text: "Help buyers get authentic products and earn on every request." },
    { title: "Flexible work", text: "Accept requests that fit your schedule." },
    { title: "Fast payouts", text: "Clear milestones and timely payments." },
  ];
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">For shoppers</h1>
          <p className="section-subtitle">Turn local access into consistent earnings</p>
        </div>
      </header>
      <section className="py-16">
        <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((p) => (
            <div key={p.title} className="card p-6">
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-700 text-sm">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Steps />
    </div>
  );
}

