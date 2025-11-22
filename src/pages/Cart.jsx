import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { boletasAPI } from '../services/api'

/**
 * Página del Carrito - Integrada con backend
 * Permite crear órdenes de compra (boletas) y ver historial
 */
export default function Cart(){
  const { items, remove, clear, totalAmount } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [misOrdenes, setMisOrdenes] = useState([])
  const [loadingOrdenes, setLoadingOrdenes] = useState(false)

  const arr = Object.values(items)

  // Cargar órdenes del usuario al montar
  useEffect(() => {
    if (isAuthenticated) {
      cargarOrdenes()
    }
  }, [isAuthenticated])

  const cargarOrdenes = async () => {
    try {
      setLoadingOrdenes(true)
      const ordenes = await boletasAPI.getMias()
      setMisOrdenes(ordenes)
    } catch (err) {
      console.error('Error al cargar órdenes:', err)
    } finally {
      setLoadingOrdenes(false)
    }
  }

  const handlePagar = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (arr.length === 0) {
      setError('El carrito está vacío')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      // Preparar datos de la boleta
      const boletaData = {
        items: arr.map(item => ({
          productoId: item.id,
          cantidad: item.qty
        })),
        metodoPago: 'EFECTIVO',
        notas: `Orden desde GamerZone - ${arr.length} producto(s)`
      }

      // Crear boleta en el backend
      const nuevaBoleta = await boletasAPI.create(boletaData)

      // Limpiar carrito y mostrar éxito
      clear()
      setSuccess(true)

      // Recargar órdenes
      await cargarOrdenes()

      // Scroll al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000)

    } catch (err) {
      console.error('Error al crear boleta:', err)
      setError(err.response?.data?.message || 'Error al procesar la orden. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cart-page">
      <h2 className="mb-4 glow">Mi Carrito</h2>

      {/* Mensaje de éxito */}
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          <strong>¡Orden creada exitosamente!</strong> Tu pedido ha sido registrado.
          <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Carrito */}
      <div className="row">
        <div className="col-lg-8">
          {arr.length === 0 ? (
            <div className="card p-5 text-center">
              <i className="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
              <h4>Tu carrito está vacío</h4>
              <p className="text-muted">Agrega productos para comenzar tu orden</p>
              <button className="btn btn-accent mt-3" onClick={() => navigate('/productos')}>
                <i className="fas fa-store me-2"></i>
                Ver Productos
              </button>
            </div>
          ) : (
            <div className="card p-3">
              <h4 className="mb-3">Items en el carrito ({arr.length})</h4>
              <ul className="list-group list-group-flush">
                {arr.map(it => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-secondary"
                    key={it.id}
                  >
                    <div className="d-flex align-items-center gap-3">
                      {it.imagen && (
                        <img
                          src={it.imagen}
                          alt={it.nombre || it.name}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      )}
                      <div>
                        <strong>{it.nombre || it.name}</strong>
                        <div className="text-secondary small">
                          $ {(it.precio || it.price).toLocaleString('es-CL')} x {it.qty}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <strong>$ {(it.qty * (it.precio || it.price)).toLocaleString('es-CL')}</strong>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(it.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card p-4 sticky-top" style={{ top: '20px' }}>
            <h5 className="mb-3">Resumen de la Orden</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <strong>$ {totalAmount.toLocaleString('es-CL')}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Envío:</span>
              <strong>Gratis</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong className="text-accent">$ {totalAmount.toLocaleString('es-CL')}</strong>
            </div>

            {!isAuthenticated && (
              <div className="alert alert-warning small mb-3">
                <i className="fas fa-info-circle me-2"></i>
                Debes iniciar sesión para completar la compra
              </div>
            )}

            <button
              className="btn btn-accent w-100 mb-2"
              onClick={handlePagar}
              disabled={loading || arr.length === 0}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="fas fa-credit-card me-2"></i>
                  {isAuthenticated ? 'Realizar Pedido' : 'Iniciar Sesión para Comprar'}
                </>
              )}
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={clear}
              disabled={arr.length === 0}
            >
              <i className="fas fa-trash-alt me-2"></i>
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Historial de Órdenes */}
      {isAuthenticated && (
        <div className="mt-5">
          <h3 className="mb-4">Mis Órdenes</h3>

          {loadingOrdenes ? (
            <div className="text-center py-4">
              <div className="spinner-border text-accent" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : misOrdenes.length === 0 ? (
            <div className="card p-4 text-center">
              <i className="fas fa-receipt fa-3x mb-3 text-muted"></i>
              <p className="text-muted">Aún no tienes órdenes</p>
            </div>
          ) : (
            <div className="row g-3">
              {misOrdenes.map(orden => (
                <div className="col-12" key={orden.id}>
                  <div className="card p-3">
                    <div className="row">
                      <div className="col-md-8">
                        <h5>Orden #{orden.id}</h5>
                        <p className="text-muted small mb-2">
                          {new Date(orden.fecha).toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <div className="mb-2">
                          <span className={`badge ${
                            orden.estado === 'ENTREGADA' ? 'bg-success' :
                            orden.estado === 'CANCELADA' ? 'bg-danger' :
                            orden.estado === 'ENVIADA' ? 'bg-info' :
                            orden.estado === 'PAGADA' ? 'bg-primary' :
                            'bg-warning'
                          }`}>
                            {orden.estado}
                          </span>
                        </div>
                        <small className="text-muted">
                          {orden.detalles?.length || 0} producto(s)
                        </small>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <h4 className="text-accent mb-0">
                          $ {Number(orden.total).toLocaleString('es-CL')}
                        </h4>
                        <small className="text-muted">{orden.metodoPago}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
