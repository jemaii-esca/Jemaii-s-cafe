import { useEffect, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../auth.jsx'
import { SidebarLayout } from '../components/Sidebar.jsx'

export default function Dashboard() {
  const { token } = useAuth()
  const [s, setS] = useState(null)
  useEffect(() => { api('/dashboard', { token }).then(setS).catch(() => {}) }, [token])

  const cards = s
    ? [
        ['🧁', 'Products', s.total_products],
        ['📦', 'Items in stock', s.total_stock],
        ['🏷️', 'Categories', s.categories],
        ['⚠️', 'Low stock (5 or fewer)', s.low_stock],
        ['💰', 'Inventory value', '₱' + Number(s.inventory_value).toLocaleString()],
        ['👥', 'Registered users', s.users],
      ]
    : []

  return (
    <SidebarLayout>
      <h1 className="font-display text-2xl mb-6">Dashboard</h1>
      {!s && <p>Loading…</p>}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {cards.map(([icon, label, value]) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-2xl">{icon}</div>
            <p className="text-sm text-cafe-700 mt-2">{label}</p>
            <p className="font-display text-2xl">{value}</p>
          </div>
        ))}
      </div>
    </SidebarLayout>
  )
}
