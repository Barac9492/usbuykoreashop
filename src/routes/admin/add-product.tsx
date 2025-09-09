import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTRPC } from "~/trpc/react";

export const Route = createFileRoute("/admin/add-product")({
  component: Page,
});

function AdminLogin({ onToken }: { onToken: (t: string) => void }) {
  const trpc = useTRPC();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const login = trpc.adminLogin.useMutation({
    onSuccess: (d) => {
      localStorage.setItem("auth_token", d.token);
      onToken(d.token);
    },
    onError: (e) => setError(e.message),
  });
  return (
    <div className="card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Admin access</h2>
      <p className="text-sm text-gray-700 mb-4">Enter the admin password to continue.</p>
      <input
        className="input-field mb-3"
        placeholder="Admin password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <button className="btn-primary" onClick={() => login.mutate({ password })}>
        Continue
      </button>
    </div>
  );
}

function Page() {
  const trpc = useTRPC();
  const [authed, setAuthed] = useState<boolean>(() => !!localStorage.getItem("auth_token"));
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [koreaName, setKoreaName] = useState("");
  const [koreaUrl, setKoreaUrl] = useState("");
  const [usName, setUsName] = useState("");
  const [usUrl, setUsUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const add = trpc.addProductByUrl.useMutation({
    onSuccess: (d) => setStatus(`Added product #${d.productId}`),
    onError: (e) => setStatus(`Error: ${e.message}`),
  });

  if (!authed) {
    return (
      <div className="py-20">
        <div className="section-container">
          <AdminLogin onToken={() => setAuthed(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="section-container max-w-2xl">
        <h1 className="section-title mb-4">Add product by URL</h1>
        <p className="section-subtitle mb-10">Paste store URLs; we’ll scrape details and create entries.</p>
        <div className="card p-6 space-y-4">
          <input className="input-field" placeholder="Category (e.g., K‑Beauty)" value={category} onChange={(e) => setCategory(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Korea store name (e.g., Olive Young)" value={koreaName} onChange={(e) => setKoreaName(e.target.value)} />
            <input className="input-field" placeholder="Korea product URL" value={koreaUrl} onChange={(e) => setKoreaUrl(e.target.value)} />
            <input className="input-field" placeholder="US store name (e.g., Sephora)" value={usName} onChange={(e) => setUsName(e.target.value)} />
            <input className="input-field" placeholder="US product URL" value={usUrl} onChange={(e) => setUsUrl(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Brand (optional)" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input className="input-field" placeholder="Model (optional)" value={model} onChange={(e) => setModel(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="btn-primary"
              onClick={() =>
                add.mutate({
                  category,
                  brand: brand || undefined,
                  model: model || undefined,
                  korea: koreaName && koreaUrl ? { name: koreaName, url: koreaUrl } : undefined,
                  us: usName && usUrl ? { name: usName, url: usUrl } : undefined,
                })
              }
            >
              Add product
            </button>
          </div>
          {status && <p className="text-sm text-gray-700">{status}</p>}
        </div>
      </div>
    </div>
  );
}

