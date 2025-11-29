import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { authService } from '../services/auth.service'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    try {
      const data = await authService.login(email, password)
      setUser(data.user)
      return data.user
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  async function register(payload) {
    try {
      const data = await authService.register(payload)
      setUser(data.user)
      return data.user
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al registrarse')
    }
  }

  const value = useMemo(() => ({ user, login, logout, register, loading }), [user, loading])

  if (loading) return <div>Cargando...</div>

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth dentro de provider'); return ctx }
