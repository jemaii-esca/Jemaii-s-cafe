import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'

export default function Navbar() {
  const { token, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const link = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-cafe-500 text-white' : 'text-cafe-100 hover:bg-cafe-700'}`
  const out = async () => { await logout(); nav('/') }

  return (
    <header className="bg-cafe-900 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-display text-xl text-cafe-100">☕ Jemaii's Cafe</Link>
        <button className="md:hidden text-cafe-100 text-2xl" onClick={() => setOpen(!open)}>☰</button>
        <nav
          onClick={() => setOpen(false)}
          className={`${open ? 'block' : 'hidden'} md:flex gap-1 absolute md:static top-full left-0 right-0 bg-cafe-900 p-3 md:p-0`}
        >
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
          <NavLink to="/products" className={link}>Products</NavLink>
          {token ? (
            <button onClick={out} className="block w-full md:w-auto text-left px-3 py-2 rounded-lg text-sm text-cafe-100 hover:bg-cafe-700">Logout</button>
          ) : (
            <>
              <NavLink to="/login" className={link}>Login</NavLink>
              <NavLink to="/signup" className={link}>Sign up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
