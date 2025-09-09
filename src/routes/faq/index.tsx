import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  component: Page,
});

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-2">{q}</h3>
      <p className="text-gray-700 text-sm">{a}</p>
    </div>
  );
}

function Page() {
  const faqs = [
    { q: "How does escrow work?", a: "Your funds are held until delivery is confirmed. Disputes are resolved within clear timelines." },
    { q: "What are the fees?", a: "Service fee 5% (min $2) plus shipping from $15. No hidden costs." },
    { q: "Who are the shoppers?", a: "Verified individuals in Korea with ID checks and performance tracking." },
  ];
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">FAQ</h1>
          <p className="section-subtitle">Answers to common questions</p>
        </div>
      </header>
      <section className="py-16">
        <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((f) => (
            <QA key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

