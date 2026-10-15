import { createContext, useContext, useState } from 'react'
import { api } from './api'

const Ctx = createContext()
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  const save = (d) => {
    localStorage.setItem('token', d.token)
    localStorage.setItem('user', JSON.stringify(d.user))
    setToken(d.token)
    setUser(d.user)
  }
  const login = async (b) => save(await api('/login', { method: 'POST', body: b }))
  const register = async (b) => save(await api('/register', { method: 'POST', body: b }))
  const logout = async () => {
    try { await api('/logout', { method: 'POST', token }) } catch {}
    localStorage.clear()
    setToken(null)
    setUser(null)
  }

  return <Ctx.Provider value={{ token, user, login, register, logout }}>{children}</Ctx.Provider>
}
