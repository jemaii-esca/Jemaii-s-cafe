export default function Footer() {
  return (
    <footer className="bg-cafe-900 text-cafe-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-lg text-cafe-100">☕ Jemaii's Cafe</p>
          <p>Good coffee, warm company.</p>
        </div>
        <div>
          <p className="font-semibold text-cafe-100">Hours</p>
          <p>Mon–Sun · 8:00 AM – 9:00 PM</p>
        </div>
        <div>
          <p className="font-semibold text-cafe-100">Visit us</p>
          <p>Your street, Your city</p>
        </div>
      </div>
      <p className="text-center text-xs py-3 border-t border-cafe-700">© 2026 Jemaii's Cafe · CCIT 01 Final Output</p>
    </footer>
  )
}
