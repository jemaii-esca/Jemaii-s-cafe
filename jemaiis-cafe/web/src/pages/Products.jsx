import { useEffect, useState } from 'react'
import { api } from '../api'
import { useAuth } from '../auth.jsx'
import { SidebarLayout } from '../components/Sidebar.jsx'

const empty = { name: '', category: 'Coffee', description: '', price: '', stock: '' }
const input = 'w-full border border-cafe-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cafe-500'

export default function Products() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  // READ
  const load = async () => {
    try { setItems(await api('/products')) } catch (e) { setError(e.message) }
  }
  useEffect(() => { load() }, [])

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // CREATE + UPDATE
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api(editId ? `/products/${editId}` : '/products', {
        method: editId ? 'PUT' : 'POST',
        body: form,
        token,
      })
      setForm(empty)
      setEditId(null)
      load()
    } catch (err) {
      setError(err.errors ? Object.values(err.errors).flat().join(' ') : err.message)
    }
  }

  const edit = (p) => {
    setEditId(p.id)
    setForm({ name: p.name, category: p.category, description: p.description || '', price: p.price, stock: p.stock })
    window.scrollTo(0, 0)
  }

  // DELETE
  const remove = async (p) => {
    if (!confirm(`Delete ${p.name}?`)) return
    await api(`/products/${p.id}`, { method: 'DELETE', token })
    load()
  }

  return (
    <SidebarLayout>
      <h1 className="font-display text-2xl mb-6">Products</h1>

      <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm p-5 mb-8 grid gap-3 sm:grid-cols-2">
        <h2 className="sm:col-span-2 font-semibold">{editId ? 'Edit product' : 'Add new product'}</h2>
        {error && <p className="sm:col-span-2 bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</p>}
        <input className={input} name="name" placeholder="Name" value={form.name} onChange={change} required />
        <select className={input} name="category" value={form.category} onChange={change}>
          {['Coffee', 'Non-Coffee', 'Pastry', 'Meals'].map((c) => <option key={c}>{c}</option>)}
        </select>
        <input className={input} type="number" step="0.01" min="0" name="price" placeholder="Price (₱)" value={form.price} onChange={change} required />
        <input className={input} type="number" min="0" name="stock" placeholder="Stock" value={form.stock} onChange={change} required />
        <textarea className={`${input} sm:col-span-2`} name="description" placeholder="Description" value={form.description} onChange={change} />
        <div className="sm:col-span-2 flex gap-2">
          <button className="bg-cafe-500 hover:bg-cafe-600 text-white rounded-lg px-5 py-2">{editId ? 'Update' : 'Add product'}</button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm(empty) }} className="border border-cafe-200 rounded-lg px-5 py-2">Cancel</button>
          )}
        </div>
      </form>

      <div className="grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{p.name} <span className="text-xs bg-cafe-100 text-cafe-700 px-2 py-0.5 rounded-full ml-1">{p.category}</span></p>
              <p className="text-sm text-cafe-700">₱{Number(p.price).toFixed(2)} · Stock: {p.stock}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => edit(p)} className="text-sm border border-cafe-200 rounded-lg px-3 py-1 hover:bg-cafe-100">Edit</button>
              <button onClick={() => remove(p)} className="text-sm border border-red-200 text-red-700 rounded-lg px-3 py-1 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-cafe-600">No products yet. Add your first one above.</p>}
      </div>
    </SidebarLayout>
  )
}
