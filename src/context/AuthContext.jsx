import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
const AuthContext = createContext(null)
const KEY_USER = 'gz_user'; const KEY_USERS = 'gz_users'
function getUsers(){ try{ return JSON.parse(localStorage.getItem(KEY_USERS))||[]}catch{return[]} }
function saveUsers(list){ localStorage.setItem(KEY_USERS, JSON.stringify(list)) }

export function AuthProvider({children}){
  const [user, setUser] = useState(null)
  useEffect(()=>{ const raw=localStorage.getItem(KEY_USER); if(raw){ try{setUser(JSON.parse(raw))}catch{}} },[])
  useEffect(()=>{ user? localStorage.setItem(KEY_USER, JSON.stringify(user)) : localStorage.removeItem(KEY_USER) },[user])

  async function login(email, password){
    await new Promise(r=>setTimeout(r,50))
    const found = getUsers().find(u => u.email === email && u.password === password)
    if(!found) throw new Error('Credenciales inválidas')
    setUser(found); return found
  }
  function logout(){ setUser(null) }

  function register(payload){
    const users = getUsers()
    if(users.some(u=>u.email===payload.email)) throw new Error('Email ya registrado')
    const role = payload.email.endsWith('@admin.cl') ? 'admin' : 'user'
    const u = { ...payload, role }
    users.push(u); saveUsers(users); return u
  }

  const value = useMemo(()=>({user, login, logout, register}),[user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(){ const ctx = useContext(AuthContext); if(!ctx) throw new Error('useAuth dentro de provider'); return ctx }
