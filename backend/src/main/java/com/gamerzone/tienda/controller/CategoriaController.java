package com.gamerzone.tienda.controller;

import com.gamerzone.tienda.dto.ApiResponse;
import com.gamerzone.tienda.dto.CategoriaDTO;
import com.gamerzone.tienda.service.CategoriaService;
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

/**
 * Controlador REST para categorías
 */
@RestController
@RequestMapping("/api/v1/categorias")
@RequiredArgsConstructor
@Tag(name = "Categorías", description = "Gestión de categorías de productos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CategoriaController {

    private final CategoriaService categoriaService;

    /**
     * GET /api/v1/categorias
     * Obtiene todas las categorías activas (público)
     */
    @GetMapping
    @Operation(summary = "Listar categorías", description = "Obtiene todas las categorías activas")
    public ResponseEntity<List<CategoriaDTO>> getAllCategorias() {
        List<CategoriaDTO> categorias = categoriaService.getCategoriasActivas();
        return ResponseEntity.ok(categorias);
    }

    /**
     * GET /api/v1/categorias/{id}
     * Obtiene una categoría por ID (público)
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtener categoría", description = "Obtiene una categoría específica por ID")
    public ResponseEntity<CategoriaDTO> getCategoriaById(@PathVariable Long id) {
        CategoriaDTO categoria = categoriaService.getCategoriaById(id);
        return ResponseEntity.ok(categoria);
    }

    /**
     * POST /api/v1/categorias
     * Crea una nueva categoría (solo admin)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Crear categoría", description = "Crea una nueva categoría (solo admin)")
    public ResponseEntity<CategoriaDTO> createCategoria(@Valid @RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO nuevaCategoria = categoriaService.createCategoria(categoriaDTO);
        return new ResponseEntity<>(nuevaCategoria, HttpStatus.CREATED);
    }

    /**
     * PUT /api/v1/categorias/{id}
     * Actualiza una categoría existente (solo admin)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Actualizar categoría", description = "Actualiza una categoría existente (solo admin)")
    public ResponseEntity<CategoriaDTO> updateCategoria(
            @PathVariable Long id,
            @Valid @RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO categoriaActualizada = categoriaService.updateCategoria(id, categoriaDTO);
        return ResponseEntity.ok(categoriaActualizada);
    }

    /**
     * DELETE /api/v1/categorias/{id}
     * Elimina una categoría (soft delete) (solo admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Eliminar categoría", description = "Elimina una categoría (solo admin)")
    public ResponseEntity<ApiResponse> deleteCategoria(@PathVariable Long id) {
        categoriaService.deleteCategoria(id);
        return ResponseEntity.ok(ApiResponse.success("Categoría eliminada exitosamente"));
    }
}
