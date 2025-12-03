package com.gamerzone.tienda.controller;

import com.gamerzone.tienda.dto.BoletaDTO;
import com.gamerzone.tienda.dto.CrearBoletaRequest;
import com.gamerzone.tienda.service.BoletaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para boletas (órdenes de compra)
 */
@RestController
@RequestMapping("/api/v1/boletas")
@RequiredArgsConstructor
@Tag(name = "Boletas", description = "Gestión de órdenes de compra")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoletaController {

    private final BoletaService boletaService;

    /**
     * GET /api/v1/boletas
     * Obtiene todas las boletas (admin) o las del usuario actual (cliente)
     */
    @GetMapping
    @Operation(summary = "Listar boletas", description = "Obtiene boletas según el rol del usuario")
    public ResponseEntity<List<BoletaDTO>> getBoletas() {
        // El servicio determina si es admin o no
        List<BoletaDTO> boletas = boletaService.getBoletasUsuarioActual();
        return ResponseEntity.ok(boletas);
    }

    /**
     * GET /api/v1/boletas/todas
     * Obtiene todas las boletas del sistema (solo admin)
     */
    @GetMapping("/todas")
    @PreAuthorize("hasRole('ADMIN') or hasRole('VENDEDOR')")
    @Operation(summary = "Listar todas las boletas", description = "Obtiene todas las boletas del sistema (admin/vendedor)")
    public ResponseEntity<List<BoletaDTO>> getAllBoletas() {
        List<BoletaDTO> boletas = boletaService.getAllBoletas();
        return ResponseEntity.ok(boletas);
    }

    /**
     * GET /api/v1/boletas/{id}
     * Obtiene una boleta específica por ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtener boleta", description = "Obtiene una boleta específica por ID")
    public ResponseEntity<BoletaDTO> getBoletaById(@PathVariable Long id) {
        BoletaDTO boleta = boletaService.getBoletaById(id);
        return ResponseEntity.ok(boleta);
    }

    /**
     * POST /api/v1/boletas
     * Crea una nueva boleta (orden de compra)
     */
    @PostMapping
    @Operation(summary = "Crear boleta", description = "Crea una nueva orden de compra")
    public ResponseEntity<BoletaDTO> createBoleta(@Valid @RequestBody CrearBoletaRequest request) {
        BoletaDTO nuevaBoleta = boletaService.createBoleta(request);
        return new ResponseEntity<>(nuevaBoleta, HttpStatus.CREATED);
    }

    /**
     * PATCH /api/v1/boletas/{id}/estado
     * Actualiza el estado de una boleta (solo admin/vendedor)
     */
    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMIN') or hasRole('VENDEDOR')")
    @Operation(summary = "Actualizar estado", description = "Actualiza el estado de una boleta (admin/vendedor)")
    public ResponseEntity<BoletaDTO> updateEstadoBoleta(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String nuevoEstado = request.get("estado");
        BoletaDTO boletaActualizada = boletaService.updateEstadoBoleta(id, nuevoEstado);
        return ResponseEntity.ok(boletaActualizada);
    }
}
