import React from 'react'
import data from '../data/productos.json'
import { useCart } from '../context/CartContext'

export default function Productos(){
  const { add } = useCart()
  const [q, setQ] = React.useState('')
  const [cat, setCat] = React.useState('')
  const cats = Array.from(new Set(data.map(d=>d.categoria)))
  const list = data.filter(p => (cat? p.categoria===cat : true) && (q? p.nombre.toLowerCase().includes(q.toLowerCase()) : true))
  return (
    <div className="products-page">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3 glow">Productos Gaming</h1>
        <p className="lead">Encuentra el equipo perfecto para tu setup</p>
      </div>
      
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input 
              className="form-control search-input" 
              placeholder="Buscar productos..." 
              value={q} 
              onChange={e=>setQ(e.target.value)} 
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <select className="form-select filter-select" value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="">🎮 Todas las categorías</option>
            {cats.map(c => <option key={c} value={c}>🎯 {c}</option>)}
          </select>
        </div>
      </div>
      
      <div className="row g-4">
        {list.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <div className="product-card card h-100">
              <div className="product-image-container">
                <img className="card-img-top product-image" src={p.imagen} alt={p.nombre} />
                <div className="product-overlay">
                  <button className="btn btn-accent btn-sm quick-view">
                    <i className="fas fa-eye me-1"></i>
                    Ver
                  </button>
                </div>
                <div className="product-badge">
                  <span className="badge discount-badge">-{p.descuento}%</span>
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title product-title">{p.nombre}</h5>
                <div className="product-category mb-2">
                  <span className="badge category-badge">{p.categoria}</span>
                </div>
                <div className="product-pricing mb-3">
                  <div className="price-container">
                    <span className="current-price">$ {p.precio.toLocaleString('es-CL')}</span>
                    <span className="original-price">$ {p.precioOriginal.toLocaleString('es-CL')}</span>
                  </div>
                </div>
                <div className="product-stock mb-3">
                  <small className={`stock-indicator ${p.stock<=p.stockCritico ? 'critical' : 'normal'}`}>
                    <i className="fas fa-box me-1"></i>
                    Stock: {p.stock} {p.stock<=p.stockCritico ? '(Crítico)' : ''}
                  </small>
                </div>
                <div className="mt-auto">
                  <button className="btn btn-accent w-100 add-to-cart-btn" onClick={()=>add(p)}>
                    <i className="fas fa-shopping-cart me-2"></i>
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {list.length === 0 && (
        <div className="text-center py-5">
          <div className="no-products">
            <i className="fas fa-search fa-4x mb-3" style={{color: 'var(--accent)'}}></i>
            <h4>No se encontraron productos</h4>
            <p className="text-muted">Intenta con otros términos de búsqueda</p>
          </div>
        </div>
      )}
    </div>
  )
}
