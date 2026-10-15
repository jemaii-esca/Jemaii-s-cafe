import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'

export default function Auth({ mode }) {
  const isLogin = mode === 'login'
  const { login, register } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (isLogin) await login({ email: form.email, password: form.password })
      else await register(form)
      nav('/dashboard')
    } catch (err) {
      setError(err.errors ? Object.values(err.errors).flat().join(' ') : err.message)
    }
    setBusy(false)
  }

  const input = 'w-full border border-cafe-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cafe-500'

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h1 className="font-display text-2xl text-center">{isLogin ? 'Welcome back ☕' : 'Create your account'}</h1>
        {error && <p className="bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</p>}
        {!isLogin && <input className={input} name="name" placeholder="Full name" value={form.name} onChange={change} required />}
        <input className={input} type="email" name="email" placeholder="Email" value={form.email} onChange={change} required />
        <input className={input} type="password" name="password" placeholder="Password (min 6 characters)" value={form.password} onChange={change} required />
        <button disabled={busy} className="w-full bg-cafe-500 hover:bg-cafe-600 text-white rounded-lg py-2 disabled:opacity-60">
          {busy ? 'Please wait…' : isLogin ? 'Login' : 'Sign up'}
        </button>
        <p className="text-sm text-center text-cafe-700">
          {isLogin ? (
            <>No account yet? <Link to="/signup" className="underline">Sign up</Link></>
          ) : (
            <>Already have an account? <Link to="/login" className="underline">Login</Link></>
          )}
        </p>
      </form>
    </div>
  )
}
