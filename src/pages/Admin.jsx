import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { productosAPI, categoriasAPI, usuariosAPI, boletasAPI } from '../services/api'

/**
 * Panel de Administración - Solo accesible para ADMIN
 * Gestión completa de productos, categorías, usuarios y órdenes
 */
export default function Admin() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Estados
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [boletas, setBoletas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Form states
  const [showProductoForm, setShowProductoForm] = useState(false)
  const [editingProducto, setEditingProducto] = useState(null)
  const [showCategoriaForm, setShowCategoriaForm] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState(null)

  // Cargar datos al cambiar de tab
  useEffect(() => {
    if (activeTab === 'productos') cargarProductos()
    else if (activeTab === 'categorias') cargarCategorias()
    else if (activeTab === 'usuarios') cargarUsuarios()
    else if (activeTab === 'ordenes') cargarBoletas()
    else if (activeTab === 'dashboard') cargarDashboard()
  }, [activeTab])

  const cargarDashboard = async () => {
    try {
      setLoading(true)
      const [prods, cats, users, orders] = await Promise.all([
        productosAPI.getAll(),
        categoriasAPI.getAll(),
        usuariosAPI.getAll(),
        boletasAPI.getAll()
      ])
      setProductos(prods)
      setCategorias(cats)
      setUsuarios(users)
      setBoletas(orders)
    } catch (err) {
      console.error('Error:', err)
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const cargarProductos = async () => {
    try {
      setLoading(true)
      const data = await productosAPI.getAll()
      if (!categorias.length) {
        const cats = await categoriasAPI.getAll()
        setCategorias(cats)
      }
      setProductos(data)
    } catch (err) {
      setError('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  const cargarCategorias = async () => {
    try {
      setLoading(true)
      const data = await categoriasAPI.getAll()
      setCategorias(data)
    } catch (err) {
      setError('Error al cargar categorías')
    } finally {
      setLoading(false)
    }
  }

  const cargarUsuarios = async () => {
    try {
      setLoading(true)
      const data = await usuariosAPI.getAll()
      setUsuarios(data)
    } catch (err) {
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const cargarBoletas = async () => {
    try {
      setLoading(true)
      const data = await boletasAPI.getAll()
      setBoletas(data)
    } catch (err) {
      setError('Error al cargar órdenes')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProducto = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    try {
      await productosAPI.delete(id)
      await cargarProductos()
      alert('Producto eliminado exitosamente')
    } catch (err) {
      alert('Error al eliminar producto')
    }
  }

  const handleDeleteCategoria = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return
    try {
      await categoriasAPI.delete(id)
      await cargarCategorias()
      alert('Categoría eliminada exitosamente')
    } catch (err) {
      alert('Error al eliminar categoría')
    }
  }

  // Dashboard Tab
  const renderDashboard = () => (
    <div>
      <h2 className="mb-4 glow">Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card p-4 text-center">
            <i className="fas fa-box fa-3x mb-3 text-accent"></i>
            <h3>{productos.length}</h3>
            <p className="text-muted">Productos</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-4 text-center">
            <i className="fas fa-tags fa-3x mb-3 text-accent"></i>
            <h3>{categorias.length}</h3>
            <p className="text-muted">Categorías</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-4 text-center">
            <i className="fas fa-users fa-3x mb-3 text-accent"></i>
            <h3>{usuarios.length}</h3>
            <p className="text-muted">Usuarios</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-4 text-center">
            <i className="fas fa-receipt fa-3x mb-3 text-accent"></i>
            <h3>{boletas.length}</h3>
            <p className="text-muted">Órdenes</p>
          </div>
        </div>
      </div>

      {/* Productos con stock bajo */}
      <div className="mt-5">
        <h4 className="mb-3">⚠️ Productos con Stock Bajo</h4>
        <div className="card p-3">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Stock</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productos.filter(p => p.stock <= p.stockCritico).map(p => (
                <tr key={p.id}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td><span className="badge bg-danger">{p.stock}</span></td>
                  <td>{p.categoriaNombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // Productos Tab
  const renderProductos = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="glow">Gestión de Productos</h2>
        <button className="btn btn-accent" onClick={() => {setShowProductoForm(true); setEditingProducto(null)}}>
          <i className="fas fa-plus me-2"></i>Nuevo Producto
        </button>
      </div>

      {showProductoForm && (
        <ProductoForm
          producto={editingProducto}
          categorias={categorias}
          onSave={async () => {
            setShowProductoForm(false)
            setEditingProducto(null)
            await cargarProductos()
          }}
          onCancel={() => {
            setShowProductoForm(false)
            setEditingProducto(null)
          }}
        />
      )}

      <div className="card p-3">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>$ {Number(p.precio).toLocaleString('es-CL')}</td>
                <td>{p.stock}</td>
                <td>{p.categoriaNombre}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => {setEditingProducto(p); setShowProductoForm(true)}}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProducto(p.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  // Categorías Tab
  const renderCategorias = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="glow">Gestión de Categorías</h2>
        <button className="btn btn-accent" onClick={() => {setShowCategoriaForm(true); setEditingCategoria(null)}}>
          <i className="fas fa-plus me-2"></i>Nueva Categoría
        </button>
      </div>

      {showCategoriaForm && (
        <CategoriaForm
          categoria={editingCategoria}
          onSave={async () => {
            setShowCategoriaForm(false)
            setEditingCategoria(null)
            await cargarCategorias()
          }}
          onCancel={() => {
            setShowCategoriaForm(false)
            setEditingCategoria(null)
          }}
        />
      )}

      <div className="row g-4">
        {categorias.map(c => (
          <div className="col-md-4" key={c.id}>
            <div className="card p-4">
              <h4>{c.nombre}</h4>
              <p className="text-muted">{c.descripcion}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-warning" onClick={() => {setEditingCategoria(c); setShowCategoriaForm(true)}}>
                  <i className="fas fa-edit me-1"></i>Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCategoria(c.id)}>
                  <i className="fas fa-trash me-1"></i>Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Usuarios Tab
  const renderUsuarios = () => (
    <div>
      <h2 className="mb-4 glow">Gestión de Usuarios</h2>
      <div className="card p-3">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>RUN</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.run}</td>
                <td><span className={`badge ${u.rol === 'ADMIN' ? 'bg-danger' : u.rol === 'VENDEDOR' ? 'bg-warning' : 'bg-info'}`}>{u.rol}</span></td>
                <td><span className={`badge ${u.activo ? 'bg-success' : 'bg-secondary'}`}>{u.activo ? 'Activo' : 'Inactivo'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  // Órdenes Tab
  const renderOrdenes = () => (
    <div>
      <h2 className="mb-4 glow">Gestión de Órdenes</h2>
      <div className="card p-3">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.usuarioNombre}</td>
                <td>{new Date(b.fecha).toLocaleDateString('es-CL')}</td>
                <td>$ {Number(b.total).toLocaleString('es-CL')}</td>
                <td><span className="badge bg-warning">{b.estado}</span></td>
                <td>{b.detalles?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-accent" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <i className="fas fa-chart-line me-2"></i>Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`} onClick={() => setActiveTab('productos')}>
            <i className="fas fa-box me-2"></i>Productos
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'categorias' ? 'active' : ''}`} onClick={() => setActiveTab('categorias')}>
            <i className="fas fa-tags me-2"></i>Categorías
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('usuarios')}>
            <i className="fas fa-users me-2"></i>Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'ordenes' ? 'active' : ''}`} onClick={() => setActiveTab('ordenes')}>
            <i className="fas fa-receipt me-2"></i>Órdenes
          </button>
        </li>
      </ul>

      {/* Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'productos' && renderProductos()}
      {activeTab === 'categorias' && renderCategorias()}
      {activeTab === 'usuarios' && renderUsuarios()}
      {activeTab === 'ordenes' && renderOrdenes()}
    </div>
  )
}

// Formulario de Producto
function ProductoForm({ producto, categorias, onSave, onCancel }) {
  const [formData, setFormData] = useState(producto || {
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    precioOriginal: '',
    descuento: 0,
    stock: '',
    stockCritico: 3,
    imagen: '',
    categoriaId: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (producto) {
        await productosAPI.update(producto.id, formData)
      } else {
        await productosAPI.create(formData)
      }
      alert('Producto guardado exitosamente')
      onSave()
    } catch (err) {
      alert('Error al guardar producto')
    }
  }

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-3">{producto ? 'Editar' : 'Nuevo'} Producto</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Código" value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
          </div>
          <div className="col-12">
            <textarea className="form-control" placeholder="Descripción" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Precio" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Precio Original" value={formData.precioOriginal} onChange={e => setFormData({...formData, precioOriginal: e.target.value})} />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Descuento %" value={formData.descuento} onChange={e => setFormData({...formData, descuento: e.target.value})} />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Stock Crítico" value={formData.stockCritico} onChange={e => setFormData({...formData, stockCritico: e.target.value})} />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={formData.categoriaId} onChange={e => setFormData({...formData, categoriaId: e.target.value})} required>
              <option value="">Seleccionar Categoría</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="col-12">
            <input type="url" className="form-control" placeholder="URL de Imagen" value={formData.imagen} onChange={e => setFormData({...formData, imagen: e.target.value})} />
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-accent">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

// Formulario de Categoría
function CategoriaForm({ categoria, onSave, onCancel }) {
  const [formData, setFormData] = useState(categoria || { nombre: '', descripcion: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (categoria) {
        await categoriasAPI.update(categoria.id, {...formData, activo: true})
      } else {
        await categoriasAPI.create({...formData, activo: true})
      }
      alert('Categoría guardada exitosamente')
      onSave()
    } catch (err) {
      alert('Error al guardar categoría')
    }
  }

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-3">{categoria ? 'Editar' : 'Nueva'} Categoría</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <input type="text" className="form-control" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
          </div>
          <div className="col-12">
            <textarea className="form-control" placeholder="Descripción" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-accent">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  )
}
