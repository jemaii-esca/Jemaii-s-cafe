import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function Home() {
  const [items, setItems] = useState([])
  useEffect(() => { api('/products').then(setItems).catch(() => {}) }, [])

  return (
    <>
      {/* Hero section */}
      <section className="bg-cafe-900 text-cafe-50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-cafe-200 tracking-widest text-xs uppercase mb-3">Welcome to</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4">Jemaii's Cafe</h1>
          <p className="max-w-xl mx-auto text-cafe-200 mb-8">Brewed with love, served with a smile. Your cozy corner for coffee, pastries and good company.</p>
          <div className="flex justify-center gap-3">
            <a href="#menu" className="bg-cafe-500 hover:bg-cafe-600 px-5 py-2 rounded-lg">See our menu</a>
            <Link to="/signup" className="border border-cafe-200 px-5 py-2 rounded-lg hover:bg-cafe-700">Join us</Link>
          </div>
        </div>
      </section>

      {/* Sub content section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid gap-4 md:grid-cols-3">
        {[
          ['☕', 'Freshly brewed', 'Every cup is made to order from carefully roasted beans.'],
          ['🥐', 'Baked daily', 'Pastries and cakes come fresh out of our oven each morning.'],
          ['🛋️', 'Cozy place', 'Relax, study or catch up with friends in our warm space.'],
        ].map(([icon, title, text]) => (
          <div key={title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="font-display text-lg mb-1">{title}</h3>
            <p className="text-sm text-cafe-700">{text}</p>
          </div>
        ))}
      </section>

      {/* Main content section */}
      <section id="menu" className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl text-center mb-6">Our Menu</h2>
        {items.length === 0 && <p className="text-center text-cafe-600">Menu coming soon…</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-5 shadow-sm">
              <span className="text-xs bg-cafe-100 text-cafe-700 px-2 py-1 rounded-full">{p.category}</span>
              <h3 className="font-display text-lg mt-2">{p.name}</h3>
              <p className="text-sm text-cafe-700 mb-3">{p.description}</p>
              <p className="font-semibold text-cafe-600">₱{Number(p.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
