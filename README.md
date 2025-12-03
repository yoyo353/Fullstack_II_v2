# 🎮 GamerZone - E-commerce Fullstack

**Evaluación Parcial 3 - DSY1104 Desarrollo Fullstack II**
**DuocUC - Ingeniería en Informática**

Sistema completo de e-commerce para productos gaming con backend Spring Boot y frontend React.

---

## 📋 Descripción del Proyecto

GamerZone es una aplicación fullstack que permite:
- **Catálogo de productos** gaming con búsqueda y filtros
- **Sistema de autenticación** con JWT
- **Gestión de carritos** y órdenes de compra
- **Panel de administración** completo (CRUD productos, categorías, usuarios)
- **Roles de usuario** (Admin, Vendedor, Cliente)
- **API REST** documentada con Swagger

---

## 🛠️ Tecnologías Utilizadas

### Backend
- ☕ **Java 17**
- 🍃 **Spring Boot 3.2.0**
- 🔐 **Spring Security + JWT**
- 💾 **MySQL** (base de datos)
- 📚 **Swagger/OpenAPI** (documentación)
- 🔧 **Maven** (gestión de dependencias)

### Frontend
- ⚛️ **React 18.2**
- 🛣️ **React Router v6**
- 📡 **Axios** (peticiones HTTP)
- 🎨 **Bootstrap 5.3**
- ⚡ **Vite** (bundler)

---

## 📦 Estructura del Proyecto

```
Fullstack_II_v2/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/gamerzone/tienda/
│   │   │   │   ├── config/              # Configuraciones (Security, CORS, Swagger)
│   │   │   │   ├── controller/          # Controladores REST
│   │   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── entity/              # Entidades JPA
│   │   │   │   ├── repository/          # Repositorios JPA
│   │   │   │   ├── service/             # Servicios con lógica de negocio
│   │   │   │   ├── security/            # JWT y autenticación
│   │   │   │   └── exception/           # Manejo de excepciones
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   │   └── pom.xml
│
├── src/                        # Frontend React
│   ├── components/             # Componentes reutilizables
│   ├── context/                # Contextos (Auth, Cart)
│   ├── pages/                  # Páginas (Home, Productos, Admin, etc.)
│   ├── services/               # API services (axios)
│   └── utils/                  # Validadores
│
├── package.json
└── README.md
```

---

## 🚀 Instalación y Configuración

### 1️⃣ Requisitos Previos

- **Java 17** o superior
- **Maven 3.6+**
- **Node.js 18+** y npm
- **MySQL 8.0+**

### 2️⃣ Configurar Base de Datos MySQL

```bash
# Iniciar MySQL
mysql -u root -p

# Crear la base de datos
CREATE DATABASE gamerzone_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Salir
EXIT;
```

**IMPORTANTE**: Actualiza las credenciales en `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gamerzone_db
spring.datasource.username=root
spring.datasource.password=TU_CONTRASEÑA_AQUI
```

### 3️⃣ Iniciar el Backend

```bash
# Navegar a la carpeta backend
cd backend

# Compilar el proyecto (primera vez)
mvn clean install

# Ejecutar el backend
mvn spring-boot:run

# O con Maven Wrapper
./mvnw spring-boot:run
```

El backend estará disponible en:
- 🌐 **API**: http://localhost:8080/api/v1
- 📚 **Swagger UI**: http://localhost:8080/swagger-ui.html
- 📖 **API Docs**: http://localhost:8080/v3/api-docs

### 4️⃣ Iniciar el Frontend

```bash
# En una nueva terminal, desde la raíz del proyecto
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en:
- 🌐 **Frontend**: http://localhost:5173

---

## 👤 Usuarios de Prueba

El sistema carga automáticamente usuarios de prueba. **Contraseña para todos: `1234`**

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| **Admin** | admin@admin.cl | 1234 | Acceso total |
| **Vendedor** | vendedor@gamerzone.cl | 1234 | Ver productos y órdenes |
| **Cliente** | cliente@gmail.com | 1234 | Comprar productos |
| **Cliente** | cliente2@gmail.com | 1234 | Comprar productos |

---

## 🔌 Endpoints de la API

### Autenticación
```http
POST   /api/v1/auth/register    # Registrar usuario
POST   /api/v1/auth/login        # Iniciar sesión (retorna JWT)
```

### Productos (Público para GET, Admin para modificar)
```http
GET    /api/v1/productos                  # Listar todos
GET    /api/v1/productos/{id}             # Obtener por ID
GET    /api/v1/productos/buscar?termino=  # Buscar
GET    /api/v1/productos/categoria/{id}   # Por categoría
POST   /api/v1/productos                  # Crear (Admin)
PUT    /api/v1/productos/{id}             # Actualizar (Admin)
DELETE /api/v1/productos/{id}             # Eliminar (Admin)
```

### Categorías (Público para GET, Admin para modificar)
```http
GET    /api/v1/categorias        # Listar todas
POST   /api/v1/categorias        # Crear (Admin)
PUT    /api/v1/categorias/{id}   # Actualizar (Admin)
DELETE /api/v1/categorias/{id}   # Eliminar (Admin)
```

### Boletas/Órdenes (Autenticado)
```http
GET    /api/v1/boletas                # Mis órdenes
GET    /api/v1/boletas/todas          # Todas (Admin/Vendedor)
GET    /api/v1/boletas/{id}           # Por ID
POST   /api/v1/boletas                # Crear orden
PATCH  /api/v1/boletas/{id}/estado    # Actualizar estado (Admin/Vendedor)
```

### Usuarios (Solo Admin)
```http
GET    /api/v1/usuarios              # Listar todos
GET    /api/v1/usuarios/{id}         # Por ID
GET    /api/v1/usuarios/rol/{rol}    # Por rol
PATCH  /api/v1/usuarios/{id}/rol     # Cambiar rol
```

---

## 🔐 Autenticación con JWT

### 1. Registrarse o Iniciar Sesión

```bash
# Registrarse
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@gmail.com",
    "password": "1234",
    "run": "12345678-9",
    "region": "RM",
    "comuna": "Santiago"
  }'

# Login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.cl",
    "password": "1234"
  }'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "id": 1,
  "email": "admin@admin.cl",
  "nombre": "Administrador GZ",
  "rol": "ADMIN"
}
```

### 2. Usar el Token en Peticiones

```bash
curl -X GET http://localhost:8080/api/v1/boletas \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

## 🎨 Funcionalidades del Frontend

### Páginas Públicas
- **Home** (`/`) - Página de inicio con hero section
- **Productos** (`/productos`) - Catálogo con búsqueda y filtros
- **Login** (`/login`) - Iniciar sesión
- **Registro** (`/registro`) - Crear cuenta

### Páginas Autenticadas
- **Carrito** (`/cart`) - Ver carrito y crear órdenes
- **Admin** (`/admin`) - Panel de administración (solo Admin)
  - Dashboard con estadísticas
  - Gestión de productos (CRUD)
  - Gestión de categorías (CRUD)
  - Visualización de usuarios
  - Gestión de órdenes

### Restricciones por Rol
- **Cliente**: Puede ver productos y crear órdenes
- **Vendedor**: Puede ver productos, órdenes y clientes (sin modificar)
- **Admin**: Acceso total al sistema

---

## 📊 Modelo de Base de Datos

```sql
USUARIOS
- id (PK)
- email (UNIQUE)
- password (encriptada)
- nombre
- run
- region, comuna
- rol (ADMIN, VENDEDOR, CLIENTE)
- activo

CATEGORIAS
- id (PK)
- nombre (UNIQUE)
- descripcion
- activo

PRODUCTOS
- id (PK)
- codigo (UNIQUE)
- nombre
- descripcion
- precio, precioOriginal, descuento
- stock, stockCritico
- imagen
- categoria_id (FK)
- activo

BOLETAS
- id (PK)
- fecha
- total
- estado (PENDIENTE, PAGADA, ENVIADA, etc.)
- metodoPago
- usuario_id (FK)

DETALLES_BOLETA
- id (PK)
- cantidad
- precioUnitario
- subtotal
- productoCodigo, productoNombre
- boleta_id (FK)
- producto_id (FK)
```

---

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
npm run test
```

---

## 📝 Scripts Disponibles

### Frontend
```bash
npm run dev        # Servidor de desarrollo (localhost:5173)
npm run build      # Compilar para producción
npm run preview    # Previsualizar build
npm run test       # Ejecutar tests
```

### Backend
```bash
mvn spring-boot:run    # Ejecutar aplicación
mvn clean install      # Compilar y empaquetar
mvn test               # Ejecutar tests
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que MySQL esté corriendo: `mysql --version`
- Confirma credenciales en `application.properties`
- Verifica que la base de datos `gamerzone_db` exista

### Error: "Port 8080 already in use"
- Detén otros procesos en puerto 8080
- O cambia el puerto en `application.properties`:
  ```properties
  server.port=8081
  ```

### Error: "CORS policy blocked"
- Verifica que el backend permita `http://localhost:5173`
- Revisa `CorsConfig.java` en el backend

### Frontend no carga productos
- Asegúrate de que el backend esté corriendo
- Verifica la URL de API en `src/services/api.js`
- Revisa la consola del navegador para errores

---

## 📚 Documentación Adicional

- 📖 **Swagger UI**: http://localhost:8080/swagger-ui.html
- 📘 **Spring Boot Docs**: https://spring.io/projects/spring-boot
- ⚛️ **React Docs**: https://react.dev
- 🔐 **JWT.io**: https://jwt.io

---

## 📞 Soporte

Para dudas sobre el proyecto:
- Revisa la documentación de Swagger
- Consulta los logs del backend
- Verifica la consola del navegador (DevTools)

---

## 👨‍💻 Autor

**Evaluación Parcial 3 - DSY1104**
Desarrollo Fullstack II - DuocUC

---

## ⚖️ Licencia

Proyecto académico - DuocUC 2025

---

## 🎯 Checklist de Entrega

- [x] Backend Spring Boot funcional
- [x] Autenticación JWT implementada
- [x] Base de datos MySQL configurada
- [x] Entidades JPA completas
- [x] API REST con CRUD completo
- [x] Swagger documentado
- [x] Frontend React integrado
- [x] Sistema de roles funcionando
- [x] Panel de administración operativo
- [x] Carrito y órdenes funcionales
- [x] README con instrucciones
- [x] Datos de prueba cargados

---

🎮 **¡Happy Gaming!** 🎮
