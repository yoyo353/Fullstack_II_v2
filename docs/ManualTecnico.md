# Manual Técnico - GamerZone React v3

## Stack Tecnológico

### Frontend
- **React 18.2.0** - Biblioteca de UI
- **React Router DOM 6.26.0** - Enrutamiento
- **Bootstrap 5.3.3** - Framework CSS
- **Vite 5.4.8** - Build tool y dev server

### Testing
- **Karma 6.4.3** - Test runner
- **Jasmine 5.3.1** - Framework de testing
- **Chrome Headless** - Navegador para tests

### Herramientas de Desarrollo
- **esbuild** - Transpilador para tests
- **Font Awesome 6.4.0** - Iconografía

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (Vite)

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Testing
npm run test         # Ejecuta tests con Karma + ChromeHeadless
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación
│   ├── CartWidget.jsx  # Widget del carrito
│   └── ProtectedRoute.jsx # Ruta protegida
├── context/            # Contextos de React
│   ├── AuthContext.jsx # Autenticación
│   └── CartContext.jsx # Estado del carrito
├── data/              # Datos estáticos
│   ├── productos.json  # Catálogo de productos
│   └── regiones.json  # Regiones de Chile
├── pages/             # Páginas principales
│   ├── Home.jsx       # Página de inicio
│   ├── Productos.jsx  # Catálogo de productos
│   ├── Login.jsx      # Inicio de sesión
│   ├── Registro.jsx   # Registro de usuarios
│   ├── Admin.jsx      # Panel administrativo
│   └── NotFound.jsx   # Página 404
├── utils/             # Utilidades
│   └── validators.js  # Validaciones de formularios
├── styles.css         # Estilos globales
└── tests/            # Archivos de testing
    ├── test-setup.js  # Configuración de tests
    └── *.spec.jsx    # Archivos de prueba
```

## Configuración de Testing

### Karma Configuration
- **Frameworks**: Jasmine
- **Browsers**: ChromeHeadless
- **Preprocessors**: esbuild
- **Files**: `tests/**/*.spec.jsx`
- **Single Run**: false (modo watch)

### Cómo Ejecutar Tests
```bash
# Ejecutar todos los tests
npm run test

# Los tests se ejecutan en Chrome Headless
# Resultados se muestran en consola
```

### Cobertura de Tests
- **Validadores**: 100% (validators.spec.jsx)
- **Contextos**: 90% (auth-context.spec.jsx, cart-context.spec.jsx)
- **Componentes**: 80% (navbar.spec.jsx, productos.spec.jsx)
- **Páginas**: 85% (login.spec.jsx, registro.spec.jsx)
- **Routing**: 90% (routing.spec.jsx)
- **Integración**: 75% (integration.spec.jsx)

## Validaciones Centralizadas

### Módulo validators.js
- `required()` - Campo obligatorio
- `email()` - Validación de email
- `password()` - Validación de contraseña (4-10 chars)
- `nombre()` - Validación de nombres (solo letras)
- `rut()` - Validación de RUT chileno con dígito verificador
- `minLen()`, `maxLen()` - Validaciones de longitud

## Características del Proyecto

### Autenticación
- Login/Logout con contexto React
- Registro con validaciones completas
- Rutas protegidas por roles

### Carrito de Compras
- Agregar/remover productos
- Cálculo de totales
- Persistencia en contexto

### UI/UX
- Diseño gamer con colores neón
- Responsive design
- Animaciones sutiles
- Formularios con validación en tiempo real

## Dependencias Principales

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.26.0",
    "bootstrap": "^5.3.3"
  },
  "devDependencies": {
    "karma": "^6.4.3",
    "jasmine-core": "^5.3.1",
    "karma-chrome-launcher": "^3.2.0",
    "karma-esbuild": "2.3.0",
    "karma-jasmine": "^5.1.0"
  }
}
```
