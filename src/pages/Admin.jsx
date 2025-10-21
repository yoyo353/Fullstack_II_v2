import React from 'react'

export default function Admin(){
  return (
    <div className="text-center py-5">
      <div className="maintenance-container">
        <i className="fas fa-tools fa-4x mb-4" style={{color: 'var(--accent)'}}></i>
        <h1 className="display-4 fw-bold mb-3">Ventana en Mantenimiento</h1>
        <p className="lead mb-4">Estamos trabajando para mejorar tu experiencia</p>
        <div className="maintenance-card">
          <p className="mb-0">El panel de administración estará disponible próximamente</p>
        </div>
      </div>
    </div>
  )
}
