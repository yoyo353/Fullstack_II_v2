import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CartWidget from './CartWidget'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark gamer-navbar">
      <div className="container">
        <Link className="navbar-brand gamer-brand" to="/">
          <i className="fas fa-gamepad me-2"></i>
          GamerZone
        </Link>
        <button className="navbar-toggler gamer-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
          aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link gamer-nav-link" to="/">
                <i className="fas fa-home me-1"></i>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link gamer-nav-link" to="/productos">
                <i className="fas fa-shopping-bag me-1"></i>
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link gamer-nav-link" to="/registro">
                <i className="fas fa-user-plus me-1"></i>
                Registro
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link gamer-nav-link" to="/admin">
                <i className="fas fa-cog me-1"></i>
                Admin
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            {user ? (<>
              <div className="user-info d-none d-md-flex align-items-center">
                <div className="user-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="user-details ms-2">
                  <div className="user-email">{user.email}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </div>
              <button className="btn btn-outline-light btn-sm gamer-btn" onClick={logout}>
                <i className="fas fa-sign-out-alt me-1"></i>
                Salir
              </button>
            </>) : (
              <Link to="/login" className="btn btn-outline-light btn-sm gamer-btn">
                <i className="fas fa-sign-in-alt me-1"></i>
                Login
              </Link>
            )}
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  )
}
