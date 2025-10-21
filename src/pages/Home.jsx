import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="display-3 fw-bold mb-4 glow">GamerZone</h1>
              <p className="lead mb-4 fs-4">La tienda definitiva para gamers</p>
              <p className="text-muted mb-5 fs-5">Descubre los mejores productos gaming con tecnología de vanguardia</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/productos" className="btn btn-accent btn-lg px-4 py-3">
                  <i className="fas fa-gamepad me-2"></i>
                  Ver Productos
                </Link>
                <Link to="/registro" className="btn btn-outline-light btn-lg px-4 py-3">
                  <i className="fas fa-user-plus me-2"></i>
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="gaming-setup">
                <div className="monitor">
                  <div className="screen">
                    <div className="pixel"></div>
                    <div className="pixel"></div>
                    <div className="pixel"></div>
                    <div className="pixel"></div>
                  </div>
                </div>
                <div className="keyboard"></div>
                <div className="mouse"></div>
                <div className="headset"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de características */}
      <div className="features-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="feature-card card h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-shipping-fast fa-3x" style={{color: 'var(--accent)'}}></i>
                  </div>
                  <h5 className="card-title">Envío Rápido</h5>
                  <p className="card-text">Entrega express en 24-48 horas</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card card h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-shield-alt fa-3x" style={{color: 'var(--accent-secondary)'}}></i>
                  </div>
                  <h5 className="card-title">Garantía</h5>
                  <p className="card-text">2 años de garantía en todos los productos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card card h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-headset fa-3x" style={{color: 'var(--neon-green)'}}></i>
                  </div>
                  <h5 className="card-title">Soporte 24/7</h5>
                  <p className="card-text">Atención al cliente siempre disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
