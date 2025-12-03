package com.gamerzone.tienda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación GamerZone Backend
 * Evaluación Parcial 3 - DSY1104 Desarrollo Fullstack II
 *
 * @author DuocUC
 * @version 1.0.0
 */
@SpringBootApplication
public class TiendaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TiendaApplication.class, args);
        System.out.println("\n==============================================");
        System.out.println("🎮 GamerZone Backend Started Successfully! 🎮");
        System.out.println("==============================================");
        System.out.println("📍 API Base URL: http://localhost:8080/api/v1");
        System.out.println("📚 Swagger UI: http://localhost:8080/swagger-ui.html");
        System.out.println("📖 API Docs: http://localhost:8080/v3/api-docs");
        System.out.println("==============================================\n");
    }
}
