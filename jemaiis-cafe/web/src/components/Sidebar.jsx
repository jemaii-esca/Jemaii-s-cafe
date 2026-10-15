import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'

export function SidebarLayout({ children }) {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const link = ({ isActive }) =>
    `px-4 py-2 rounded-lg whitespace-nowrap ${isActive ? 'bg-cafe-500 text-white' : 'text-cafe-900 hover:bg-cafe-100'}`

  return (
    <div className="max-w-6xl mx-auto md:flex">
      <aside className="md:w-56 md:min-h-[70vh] bg-white md:border-r border-b border-cafe-200 p-3 md:p-4">
        <p className="hidden md:block text-xs uppercase text-cafe-600 mb-3">Hi, {user?.name}</p>
        <nav className="flex md:flex-col gap-2 overflow-x-auto">
          <NavLink to="/dashboard" className={link}>📊 Dashboard</NavLink>
          <NavLink to="/products" className={link}>🧁 Products</NavLink>
          <button
            onClick={async () => { await logout(); nav('/') }}
            className="px-4 py-2 rounded-lg text-left text-red-700 hover:bg-red-50 whitespace-nowrap"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  )
}
