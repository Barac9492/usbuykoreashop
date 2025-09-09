export function Steps() {
  const items = [
    { title: "Browse", text: "Find products and compare US vs. Korea prices." },
    { title: "Request", text: "Submit a request. Funds are held in escrow." },
    { title: "Delivery", text: "Your shopper purchases and ships to you." },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title text-center mb-6">How it works</h2>
        <p className="section-subtitle text-center mb-12">Three simple steps to shop from Korea</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((s) => (
            <div key={s.title} className="card p-8">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-700">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

