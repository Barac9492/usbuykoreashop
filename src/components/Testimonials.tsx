export function Testimonials() {
  const items = [
    { quote: "Felt like shopping in Myeongdong—saved 40%.", author: "Emily, CA" },
    { quote: "Seamless and safe. Escrow gave me peace of mind.", author: "David, NY" },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <blockquote key={i} className="card p-6">
              <p className="text-gray-900 mb-3">“{t.quote}”</p>
              <cite className="text-sm text-gray-600">— {t.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

