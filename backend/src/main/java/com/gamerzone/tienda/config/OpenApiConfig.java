package com.gamerzone.tienda.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

/**
 * Configuración de Swagger/OpenAPI para documentación de la API
 */
@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "GamerZone API",
                version = "1.0.0",
                description = """
                        API REST para GamerZone - E-commerce de productos gaming

                        ## Evaluación Parcial 3 - DSY1104 Desarrollo Fullstack II

                        ### Funcionalidades:
                        - Autenticación JWT
                        - Gestión de productos y categorías
                        - Sistema de órdenes de compra (boletas)
                        - Gestión de usuarios con roles (ADMIN, VENDEDOR, CLIENTE)

                        ### Roles y Permisos:
                        - **ADMIN**: Acceso total al sistema
                        - **VENDEDOR**: Visualización de productos y órdenes
                        - **CLIENTE**: Crear órdenes, ver su historial

                        ### Autenticación:
                        1. Registrarse en `/api/v1/auth/register`
                        2. Iniciar sesión en `/api/v1/auth/login`
                        3. Copiar el token JWT de la respuesta
                        4. Hacer clic en el botón "Authorize" y pegar el token
                        5. Ahora puedes hacer peticiones autenticadas
                        """,
                contact = @Contact(
                        name = "GamerZone Team",
                        email = "contacto@gamerzone.cl"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                )
        ),
        servers = {
                @Server(
                        url = "http://localhost:8080",
                        description = "Servidor de Desarrollo Local"
                ),
                @Server(
                        url = "http://localhost:5173",
                        description = "Frontend React (Vite)"
                )
        }
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer",
        in = SecuritySchemeIn.HEADER,
        description = """
                Ingresa el token JWT obtenido del endpoint de login.

                Ejemplo: Después de hacer login en /api/v1/auth/login, copia el valor del campo 'token'
                y pégalo en el campo de abajo (no incluyas la palabra 'Bearer', solo el token).
                """
)
public class OpenApiConfig {
    // La configuración se hace mediante anotaciones
    // No se requiere código adicional aquí
}
