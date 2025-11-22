package com.gamerzone.tienda.controller;

import com.gamerzone.tienda.dto.UsuarioDTO;
import com.gamerzone.tienda.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para gestión de usuarios (solo admin)
 */
@RestController
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Gestión de usuarios del sistema (solo admin)")
@SecurityRequirement(name = "Bearer Authentication")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * GET /api/v1/usuarios
     * Obtiene todos los usuarios (solo admin)
     */
    @GetMapping
    @Operation(summary = "Listar usuarios", description = "Obtiene todos los usuarios del sistema")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    /**
     * GET /api/v1/usuarios/activos
     * Obtiene usuarios activos (solo admin)
     */
    @GetMapping("/activos")
    @Operation(summary = "Listar usuarios activos", description = "Obtiene usuarios activos del sistema")
    public ResponseEntity<List<UsuarioDTO>> getUsuariosActivos() {
        List<UsuarioDTO> usuarios = usuarioService.getUsuariosActivos();
        return ResponseEntity.ok(usuarios);
    }

    /**
     * GET /api/v1/usuarios/{id}
     * Obtiene un usuario por ID (solo admin)
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario", description = "Obtiene un usuario específico por ID")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable Long id) {
        UsuarioDTO usuario = usuarioService.getUsuarioById(id);
        return ResponseEntity.ok(usuario);
    }

    /**
     * GET /api/v1/usuarios/rol/{rol}
     * Obtiene usuarios por rol (solo admin)
     */
    @GetMapping("/rol/{rol}")
    @Operation(summary = "Usuarios por rol", description = "Obtiene usuarios de un rol específico")
    public ResponseEntity<List<UsuarioDTO>> getUsuariosByRol(@PathVariable String rol) {
        List<UsuarioDTO> usuarios = usuarioService.getUsuariosByRol(rol);
        return ResponseEntity.ok(usuarios);
    }

    /**
     * PATCH /api/v1/usuarios/{id}/rol
     * Actualiza el rol de un usuario (solo admin)
     */
    @PatchMapping("/{id}/rol")
    @Operation(summary = "Actualizar rol", description = "Actualiza el rol de un usuario")
    public ResponseEntity<UsuarioDTO> updateRolUsuario(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String nuevoRol = request.get("rol");
        UsuarioDTO usuarioActualizado = usuarioService.updateRolUsuario(id, nuevoRol);
        return ResponseEntity.ok(usuarioActualizado);
    }

    /**
     * PATCH /api/v1/usuarios/{id}/toggle-activo
     * Activa o desactiva un usuario (solo admin)
     */
    @PatchMapping("/{id}/toggle-activo")
    @Operation(summary = "Activar/Desactivar usuario", description = "Cambia el estado activo de un usuario")
    public ResponseEntity<UsuarioDTO> toggleActivoUsuario(@PathVariable Long id) {
        UsuarioDTO usuarioActualizado = usuarioService.toggleActivoUsuario(id);
        return ResponseEntity.ok(usuarioActualizado);
    }
}
