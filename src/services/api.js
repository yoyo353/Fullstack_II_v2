import axios from 'axios';

/**
 * Configuración de Axios para la API
 * Backend: http://localhost:8080
 */

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gz_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('gz_token');
      localStorage.removeItem('gz_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==============================================
// AUTENTICACIÓN
// ==============================================

export const authAPI = {
  /**
   * Login - POST /api/v1/auth/login
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Registro - POST /api/v1/auth/register
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// ==============================================
// PRODUCTOS
// ==============================================

export const productosAPI = {
  /**
   * Obtener todos los productos - GET /api/v1/productos
   */
  getAll: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  /**
   * Obtener producto por ID - GET /api/v1/productos/{id}
   */
  getById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  /**
   * Buscar productos - GET /api/v1/productos/buscar?termino=
   */
  buscar: async (termino) => {
    const response = await api.get(`/productos/buscar?termino=${termino}`);
    return response.data;
  },

  /**
   * Productos por categoría - GET /api/v1/productos/categoria/{id}
   */
  getByCategoria: async (categoriaId) => {
    const response = await api.get(`/productos/categoria/${categoriaId}`);
    return response.data;
  },

  /**
   * Crear producto - POST /api/v1/productos (Solo ADMIN)
   */
  create: async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  /**
   * Actualizar producto - PUT /api/v1/productos/{id} (Solo ADMIN)
   */
  update: async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  /**
   * Eliminar producto - DELETE /api/v1/productos/{id} (Solo ADMIN)
   */
  delete: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
};

// ==============================================
// CATEGORÍAS
// ==============================================

export const categoriasAPI = {
  /**
   * Obtener todas las categorías - GET /api/v1/categorias
   */
  getAll: async () => {
    const response = await api.get('/categorias');
    return response.data;
  },

  /**
   * Obtener categoría por ID - GET /api/v1/categorias/{id}
   */
  getById: async (id) => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  /**
   * Crear categoría - POST /api/v1/categorias (Solo ADMIN)
   */
  create: async (categoria) => {
    const response = await api.post('/categorias', categoria);
    return response.data;
  },

  /**
   * Actualizar categoría - PUT /api/v1/categorias/{id} (Solo ADMIN)
   */
  update: async (id, categoria) => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data;
  },

  /**
   * Eliminar categoría - DELETE /api/v1/categorias/{id} (Solo ADMIN)
   */
  delete: async (id) => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  },
};

// ==============================================
// BOLETAS (ÓRDENES)
// ==============================================

export const boletasAPI = {
  /**
   * Obtener boletas del usuario - GET /api/v1/boletas
   */
  getMias: async () => {
    const response = await api.get('/boletas');
    return response.data;
  },

  /**
   * Obtener todas las boletas - GET /api/v1/boletas/todas (ADMIN/VENDEDOR)
   */
  getAll: async () => {
    const response = await api.get('/boletas/todas');
    return response.data;
  },

  /**
   * Obtener boleta por ID - GET /api/v1/boletas/{id}
   */
  getById: async (id) => {
    const response = await api.get(`/boletas/${id}`);
    return response.data;
  },

  /**
   * Crear boleta - POST /api/v1/boletas
   */
  create: async (boletaData) => {
    const response = await api.post('/boletas', boletaData);
    return response.data;
  },

  /**
   * Actualizar estado - PATCH /api/v1/boletas/{id}/estado (ADMIN/VENDEDOR)
   */
  updateEstado: async (id, estado) => {
    const response = await api.patch(`/boletas/${id}/estado`, { estado });
    return response.data;
  },
};

// ==============================================
// USUARIOS (Solo ADMIN)
// ==============================================

export const usuariosAPI = {
  /**
   * Obtener todos los usuarios - GET /api/v1/usuarios
   */
  getAll: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  /**
   * Obtener usuario por ID - GET /api/v1/usuarios/{id}
   */
  getById: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  /**
   * Obtener usuarios por rol - GET /api/v1/usuarios/rol/{rol}
   */
  getByRol: async (rol) => {
    const response = await api.get(`/usuarios/rol/${rol}`);
    return response.data;
  },

  /**
   * Actualizar rol - PATCH /api/v1/usuarios/{id}/rol
   */
  updateRol: async (id, rol) => {
    const response = await api.patch(`/usuarios/${id}/rol`, { rol });
    return response.data;
  },

  /**
   * Activar/Desactivar usuario - PATCH /api/v1/usuarios/{id}/toggle-activo
   */
  toggleActivo: async (id) => {
    const response = await api.patch(`/usuarios/${id}/toggle-activo`);
    return response.data;
  },
};

export default api;
