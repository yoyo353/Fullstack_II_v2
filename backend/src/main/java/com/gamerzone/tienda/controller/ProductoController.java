package com.gamerzone.tienda.controller;

import com.gamerzone.tienda.dto.ApiResponse;
import com.gamerzone.tienda.dto.ProductoDTO;
import com.gamerzone.tienda.service.ProductoService;
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
 * Controlador REST para productos
 */
@RestController
@RequestMapping("/api/v1/productos")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "Gestión de productos del catálogo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductoController {

    private final ProductoService productoService;

    /**
     * GET /api/v1/productos
     * Obtiene todos los productos activos (público)
     */
    @GetMapping
    @Operation(summary = "Listar productos", description = "Obtiene todos los productos activos del catálogo")
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        List<ProductoDTO> productos = productoService.getProductosActivos();
        return ResponseEntity.ok(productos);
    }

    /**
     * GET /api/v1/productos/{id}
     * Obtiene un producto por ID (público)
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto", description = "Obtiene un producto específico por ID")
    public ResponseEntity<ProductoDTO> getProductoById(@PathVariable Long id) {
        ProductoDTO producto = productoService.getProductoById(id);
        return ResponseEntity.ok(producto);
    }

    /**
     * GET /api/v1/productos/buscar?termino=
     * Busca productos por nombre o código (público)
     */
    @GetMapping("/buscar")
    @Operation(summary = "Buscar productos", description = "Busca productos por nombre o código")
    public ResponseEntity<List<ProductoDTO>> buscarProductos(@RequestParam String termino) {
        List<ProductoDTO> productos = productoService.buscarProductos(termino);
        return ResponseEntity.ok(productos);
    }

    /**
     * GET /api/v1/productos/categoria/{categoriaId}
     * Obtiene productos por categoría (público)
     */
    @GetMapping("/categoria/{categoriaId}")
    @Operation(summary = "Productos por categoría", description = "Obtiene productos de una categoría específica")
    public ResponseEntity<List<ProductoDTO>> getProductosByCategoria(@PathVariable Long categoriaId) {
        List<ProductoDTO> productos = productoService.getProductosByCategoria(categoriaId);
        return ResponseEntity.ok(productos);
    }

    /**
     * POST /api/v1/productos
     * Crea un nuevo producto (solo admin)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Crear producto", description = "Crea un nuevo producto (solo admin)")
    public ResponseEntity<ProductoDTO> createProducto(@Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO nuevoProducto = productoService.createProducto(productoDTO);
        return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
    }

    /**
     * PUT /api/v1/productos/{id}
     * Actualiza un producto existente (solo admin)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Actualizar producto", description = "Actualiza un producto existente (solo admin)")
    public ResponseEntity<ProductoDTO> updateProducto(
            @PathVariable Long id,
            @Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO productoActualizado = productoService.updateProducto(id, productoDTO);
        return ResponseEntity.ok(productoActualizado);
    }

    /**
     * DELETE /api/v1/productos/{id}
     * Elimina un producto (soft delete) (solo admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Eliminar producto", description = "Elimina un producto del catálogo (solo admin)")
    public ResponseEntity<ApiResponse> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.ok(ApiResponse.success("Producto eliminado exitosamente"));
    }
}
