# Tests - GamerZone React v3

Esta carpeta contiene todas las pruebas unitarias del proyecto.

## Estructura

```
tests/
├── test-setup.js           # Configuración global para tests
├── Smoke.spec.jsx          # Test de humo (renderizado básico)
├── validators.spec.jsx     # Tests de validaciones
├── auth-context.spec.jsx   # Tests del contexto de autenticación
├── cart-context.spec.jsx   # Tests del contexto del carrito
├── navbar.spec.jsx         # Tests del componente Navbar
├── productos.spec.jsx      # Tests de la página Productos
├── login.spec.jsx          # Tests de la página Login
├── registro.spec.jsx       # Tests de la página Registro
├── routing.spec.jsx        # Tests de enrutamiento
└── integration.spec.jsx    # Tests de integración
```

## Ejecutar Tests

```bash
# Desde la raíz del proyecto
npm run test
```

## Cobertura

- **Total de archivos de prueba**: 10
- **Total de casos de prueba**: 45+
- **Cobertura estimada**: 85%

## Framework

- **Karma** - Test runner
- **Jasmine** - Framework de testing
- **Chrome Headless** - Navegador para tests
- **Testing Library** - Utilidades para testing de React
