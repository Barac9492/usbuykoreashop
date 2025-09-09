import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Page,
});

function Page() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  return (
    <div className="bg-white">
      <header className="py-20">
        <div className="section-container text-center">
          <h1 className="section-title mb-4">Contact</h1>
          <p className="section-subtitle">We’re here to help</p>
        </div>
      </header>
      <section className="py-16">
        <div className="section-container max-w-xl">
          {status === "sent" ? (
            <div className="card p-6 text-center">
              <p className="text-gray-900 mb-2">Thanks—your message was sent.</p>
              <p className="text-gray-700 text-sm">We’ll reply within 1–2 business days.</p>
            </div>
          ) : (
            <form
              className="card p-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
              }}
            >
              <input className="input-field" placeholder="Name" required />
              <input className="input-field" placeholder="Email" type="email" required />
              <textarea className="input-field" placeholder="Message" rows={5} required />
              <div className="flex justify-end">
                <button className="btn-primary">Send</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

