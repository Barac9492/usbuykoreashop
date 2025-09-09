export function PricingTable() {
  const rows = [
    { label: "Deposit", value: "Up to your max budget (escrow)" },
    { label: "Service fee", value: "5% (min $2)" },
    { label: "Shipping", value: "From $15 (estimate)" },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title text-center mb-6">Pricing</h2>
        <p className="section-subtitle text-center mb-10">Clear and predictable—no surprises</p>
        <div className="max-w-xl mx-auto card p-6">
          <ul className="divide-y divide-gray-200">
            {rows.map((r) => (
              <li key={r.label} className="flex items-center justify-between py-4">
                <span className="text-gray-700">{r.label}</span>
                <span className="font-medium">{r.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

