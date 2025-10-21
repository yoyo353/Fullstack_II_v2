import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, roles }){
  const { user } = useAuth(); const location = useLocation()
  if(!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if(roles && roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}
