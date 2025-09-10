import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTRPC } from "~/trpc/react";

export const Route = createFileRoute("/admin/add-manual")({
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

  // Product fields
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Korea price
  const [krStore, setKrStore] = useState("");
  const [krUrl, setKrUrl] = useState("");
  const [krWebsite, setKrWebsite] = useState("");
  const [krPrice, setKrPrice] = useState("");
  const [krCurrency, setKrCurrency] = useState("KRW");
  const [krAvail, setKrAvail] = useState(true);

  // US price
  const [usStore, setUsStore] = useState("");
  const [usUrl, setUsUrl] = useState("");
  const [usWebsite, setUsWebsite] = useState("");
  const [usPrice, setUsPrice] = useState("");
  const [usCurrency, setUsCurrency] = useState("USD");
  const [usAvail, setUsAvail] = useState(true);

  const [status, setStatus] = useState<string | null>(null);
  const add = trpc.addProductManual.useMutation({
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
      <div className="section-container max-w-3xl">
        <h1 className="section-title mb-4">Add product (manual)</h1>
        <p className="section-subtitle mb-10">Create products and prices without scraping.</p>

        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input className="input-field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="input-field" placeholder="Brand (optional)" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input className="input-field" placeholder="Model (optional)" value={model} onChange={(e) => setModel(e.target.value)} />
            <input className="input-field md:col-span-2" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <textarea className="input-field md:col-span-2" placeholder="Description (optional)" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="border-t border-gray-200 pt-4 mt-2" />
          <h3 className="text-lg font-semibold">Korea price (optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Store name" value={krStore} onChange={(e) => setKrStore(e.target.value)} />
            <input className="input-field" placeholder="Product URL" value={krUrl} onChange={(e) => setKrUrl(e.target.value)} />
            <input className="input-field" placeholder="Store website (optional)" value={krWebsite} onChange={(e) => setKrWebsite(e.target.value)} />
            <input className="input-field" placeholder="Price" value={krPrice} onChange={(e) => setKrPrice(e.target.value)} />
            <select className="input-field" value={krCurrency} onChange={(e) => setKrCurrency(e.target.value)}>
              <option>KRW</option>
              <option>USD</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={krAvail} onChange={(e) => setKrAvail(e.target.checked)} /> Available</label>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-2" />
          <h3 className="text-lg font-semibold">US price (optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Store name" value={usStore} onChange={(e) => setUsStore(e.target.value)} />
            <input className="input-field" placeholder="Product URL" value={usUrl} onChange={(e) => setUsUrl(e.target.value)} />
            <input className="input-field" placeholder="Store website (optional)" value={usWebsite} onChange={(e) => setUsWebsite(e.target.value)} />
            <input className="input-field" placeholder="Price" value={usPrice} onChange={(e) => setUsPrice(e.target.value)} />
            <select className="input-field" value={usCurrency} onChange={(e) => setUsCurrency(e.target.value)}>
              <option>USD</option>
              <option>KRW</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={usAvail} onChange={(e) => setUsAvail(e.target.checked)} /> Available</label>
          </div>

          <div className="flex justify-end">
            <button
              className="btn-primary"
              onClick={() =>
                add.mutate({
                  category,
                  name,
                  description: description || undefined,
                  brand: brand || undefined,
                  model: model || undefined,
                  imageUrl: imageUrl || undefined,
                  korea:
                    krStore && krUrl && krPrice
                      ? {
                          storeName: krStore,
                          storeWebsite: krWebsite || undefined,
                          productUrl: krUrl,
                          price: parseFloat(krPrice),
                          currency: krCurrency,
                          isAvailable: krAvail,
                        }
                      : undefined,
                  us:
                    usStore && usUrl && usPrice
                      ? {
                          storeName: usStore,
                          storeWebsite: usWebsite || undefined,
                          productUrl: usUrl,
                          price: parseFloat(usPrice),
                          currency: usCurrency,
                          isAvailable: usAvail,
                        }
                      : undefined,
                })
              }
            >
              Create product
            </button>
          </div>
          {status && <p className="text-sm text-gray-700">{status}</p>}
        </div>
      </div>
    </div>
  );
}

