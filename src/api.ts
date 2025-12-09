import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from './store/auth'

// In production the frontend is served by Nginx which proxies `/api/` to the
// `backapi` service. Default to a relative `/api` path so browser requests
// go through the Nginx proxy instead of attempting `localhost:8000`.
const API_BASE = (import.meta.env.VITE_API_BASE as string) || '/api'

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

export default api