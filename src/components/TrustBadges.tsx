export function TrustBadges() {
  const items = [
    { title: "Escrow-protected", text: "Funds released only after delivery." },
    { title: "Verified shoppers", text: "ID-verified partners in Korea." },
    { title: "Transparent pricing", text: "No surprises—fees clearly shown." },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((b) => (
            <div key={b.title} className="card p-6">
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-gray-700 text-sm">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

