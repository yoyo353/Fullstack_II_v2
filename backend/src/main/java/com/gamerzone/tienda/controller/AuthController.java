package com.gamerzone.tienda.controller;

import com.gamerzone.tienda.dto.ApiResponse;
import com.gamerzone.tienda.dto.AuthResponse;
import com.gamerzone.tienda.dto.LoginRequest;
import com.gamerzone.tienda.dto.RegisterRequest;
import com.gamerzone.tienda.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para autenticación
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoints para login y registro")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/v1/auth/login
     * Autentica un usuario y retorna un token JWT
     */
    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Autentica un usuario y retorna un token JWT")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/v1/auth/register
     * Registra un nuevo usuario
     */
    @PostMapping("/register")
    @Operation(summary = "Registrar usuario", description = "Crea un nuevo usuario en el sistema")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/v1/auth/health
     * Health check endpoint
     */
    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Verifica que el servicio de autenticación esté funcionando")
    public ResponseEntity<ApiResponse> health() {
        return ResponseEntity.ok(
                ApiResponse.success("Auth service is running")
        );
    }
}
