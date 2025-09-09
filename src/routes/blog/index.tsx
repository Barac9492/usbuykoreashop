import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: Page,
});

function PostCard({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <article className="card p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 text-sm">{excerpt}</p>
    </article>
  );
}

function Page() {
  const posts = [
    { title: "Beginner’s guide to K‑beauty", excerpt: "Build a simple, effective skincare routine from Korea." },
    { title: "Shipping & customs 101", excerpt: "What to expect when ordering cross‑border." },
    { title: "Top stores in Korea", excerpt: "Where our shoppers find the best prices." },
  ];
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">Guides & stories</h1>
          <p className="section-subtitle">Practical advice for smarter shopping</p>
        </div>
      </header>
      <section className="py-16">
        <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p.title} title={p.title} excerpt={p.excerpt} />
          ))}
        </div>
      </section>
    </div>
  );
}

