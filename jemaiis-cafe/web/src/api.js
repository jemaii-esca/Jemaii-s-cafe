// Works on Termux/local (127.0.0.1:8000) and on GitHub Codespaces (port 8000 must be Public).
const h = window.location.hostname
const BASE =
  import.meta.env.VITE_API_URL ||
  (h.endsWith('.app.github.dev')
    ? `https://${h.replace('-5173', '-8000')}/api`
    : 'http://127.0.0.1:8000/api')

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong')
    err.errors = data.errors
    err.status = res.status
    throw err
  }
  return data
}
