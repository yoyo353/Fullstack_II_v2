import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
<<<<<<< HEAD
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
=======
import { authAPI } from '../services/api'

const AuthContext = createContext(null)
const KEY_USER = 'gz_user'
const KEY_TOKEN = 'gz_token'

/**
 * AuthProvider - Contexto de autenticación integrado con backend
 * Maneja login, registro y persistencia de sesión con JWT
 */
export function AuthProvider({children}){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem(KEY_USER)
    const savedToken = localStorage.getItem(KEY_TOKEN)

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch(error) {
        console.error('Error al cargar usuario:', error)
        localStorage.removeItem(KEY_USER)
        localStorage.removeItem(KEY_TOKEN)
      }
    }
    setLoading(false)
  }, [])

  /**
   * Login - Autentica con el backend y guarda el token JWT
   */
  async function login(email, password){
    try {
      // Llamar al backend
      const response = await authAPI.login(email, password)

      // Guardar token y datos del usuario
      localStorage.setItem(KEY_TOKEN, response.token)

      const userData = {
        id: response.id,
        email: response.email,
        nombre: response.nombre,
        rol: response.rol.toLowerCase(), // Convertir a minúsculas para compatibilidad
      }

      localStorage.setItem(KEY_USER, JSON.stringify(userData))
      setUser(userData)

      return userData
    } catch(error) {
      console.error('Error en login:', error)
      throw new Error(error.response?.data?.message || 'Credenciales inválidas')
    }
  }

  /**
   * Logout - Cierra sesión y limpia el localStorage
   */
  function logout(){
    localStorage.removeItem(KEY_USER)
    localStorage.removeItem(KEY_TOKEN)
    setUser(null)
  }

  /**
   * Register - Registra un nuevo usuario en el backend
   */
  async function register(payload){
    try {
      // Llamar al backend
      const response = await authAPI.register(payload)

      // Guardar token y datos del usuario
      localStorage.setItem(KEY_TOKEN, response.token)

      const userData = {
        id: response.id,
        email: response.email,
        nombre: response.nombre,
        rol: response.rol.toLowerCase(),
      }

      localStorage.setItem(KEY_USER, JSON.stringify(userData))
      setUser(userData)

      return userData
    } catch(error) {
      console.error('Error en registro:', error)

      // Manejar errores de validación
      if (error.response?.data?.errors) {
        const errores = error.response.data.errors
        const mensajeError = Object.values(errores).join(', ')
        throw new Error(mensajeError)
      }

      throw new Error(error.response?.data?.message || 'Error al registrar usuario')
    }
  }

  const value = useMemo(() => ({
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
  }), [user, loading])
>>>>>>> 953893f0a477dbcd59b1d455a8744ead0cc2a544

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

<<<<<<< HEAD
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth dentro de provider'); return ctx }
=======
export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
>>>>>>> 953893f0a477dbcd59b1d455a8744ead0cc2a544
