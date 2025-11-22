import React, { useState, useEffect } from 'react'
import { productosAPI, categoriasAPI } from '../services/api'
import { useCart } from '../context/CartContext'

/**
 * Página de Productos - Integrada con backend
 * Obtiene productos y categorías desde la API REST
 */
export default function Productos(){
  const { add } = useCart()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Cargar productos y categorías en paralelo
      const [productosData, categoriasData] = await Promise.all([
        productosAPI.getAll(),
        categoriasAPI.getAll()
      ])

      setProductos(productosData)
      setCategorias(categoriasData)
    } catch (err) {
      console.error('Error al cargar datos:', err)
      setError('Error al cargar los productos. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Filtrar productos por búsqueda y categoría
  const list = productos.filter(p => {
    const matchCategoria = cat ? p.categoriaId === parseInt(cat) : true
    const matchBusqueda = q ? p.nombre.toLowerCase().includes(q.toLowerCase()) : true
    return matchCategoria && matchBusqueda
  })

  // Agregar producto al carrito
  const handleAddToCart = (producto) => {
    // Adaptar formato del producto para el carrito
    const productoCarrito = {
      id: producto.id,
      codigo: producto.codigo,
      nombre: producto.nombre,
      price: producto.precio, // CartContext espera 'price'
      imagen: producto.imagen,
      categoria: producto.categoriaNombre
    }
    add(productoCarrito)
  }

  if (loading) {
    return (
      <div className="products-page">
        <div className="text-center py-5">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="text-center py-5">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
          <button className="btn btn-accent" onClick={cargarDatos}>
            <i className="fas fa-sync me-2"></i>
            Reintentar
          </button>
        </div>
      </div>
    )
  }

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
            {categorias.map(c => (
              <option key={c.id} value={c.id}>🎯 {c.nombre}</option>
            ))}
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
                {p.descuento > 0 && (
                  <div className="product-badge">
                    <span className="badge discount-badge">-{p.descuento}%</span>
                  </div>
                )}
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title product-title">{p.nombre}</h5>
                <div className="product-category mb-2">
                  <span className="badge category-badge">{p.categoriaNombre}</span>
                </div>
                <div className="product-pricing mb-3">
                  <div className="price-container">
                    <span className="current-price">
                      $ {Number(p.precio).toLocaleString('es-CL')}
                    </span>
                    {p.precioOriginal && (
                      <span className="original-price">
                        $ {Number(p.precioOriginal).toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="product-stock mb-3">
                  <small className={`stock-indicator ${p.stock<=p.stockCritico ? 'critical' : 'normal'}`}>
                    <i className="fas fa-box me-1"></i>
                    Stock: {p.stock} {p.stock<=p.stockCritico ? '(Crítico)' : ''}
                  </small>
                </div>
                <div className="mt-auto">
                  <button
                    className="btn btn-accent w-100 add-to-cart-btn"
                    onClick={() => handleAddToCart(p)}
                    disabled={p.stock === 0}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    {p.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
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
