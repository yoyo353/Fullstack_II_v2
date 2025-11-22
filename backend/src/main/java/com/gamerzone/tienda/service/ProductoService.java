package com.gamerzone.tienda.service;

import com.gamerzone.tienda.dto.ProductoDTO;
import com.gamerzone.tienda.entity.Categoria;
import com.gamerzone.tienda.entity.Producto;
import com.gamerzone.tienda.exception.BadRequestException;
import com.gamerzone.tienda.exception.ResourceNotFoundException;
import com.gamerzone.tienda.repository.CategoriaRepository;
import com.gamerzone.tienda.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestión de productos
 */
@Service
@RequiredArgsConstructor
public class ProductoService {

    private static final Logger logger = LoggerFactory.getLogger(ProductoService.class);

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    /**
     * Obtiene todos los productos
     */
    @Transactional(readOnly = true)
    public List<ProductoDTO> getAllProductos() {
        logger.debug("Obteniendo todos los productos");
        return productoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene productos activos
     */
    @Transactional(readOnly = true)
    public List<ProductoDTO> getProductosActivos() {
        logger.debug("Obteniendo productos activos");
        return productoRepository.findByActivoTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene un producto por ID
     */
    @Transactional(readOnly = true)
    public ProductoDTO getProductoById(Long id) {
        logger.debug("Obteniendo producto con ID: {}", id);
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
        return convertToDTO(producto);
    }

    /**
     * Busca productos por nombre o código
     */
    @Transactional(readOnly = true)
    public List<ProductoDTO> buscarProductos(String termino) {
        logger.debug("Buscando productos con término: {}", termino);
        return productoRepository.buscarPorNombreOCodigo(termino).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene productos por categoría
     */
    @Transactional(readOnly = true)
    public List<ProductoDTO> getProductosByCategoria(Long categoriaId) {
        logger.debug("Obteniendo productos de categoría: {}", categoriaId);
        return productoRepository.findByCategoriaIdAndActivoTrue(categoriaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Crea un nuevo producto
     */
    @Transactional
    public ProductoDTO createProducto(ProductoDTO dto) {
        logger.info("Creando nuevo producto: {}", dto.getNombre());

        // Validar que el código no exista
        if (productoRepository.existsByCodigo(dto.getCodigo())) {
            throw new BadRequestException("Ya existe un producto con el código: " + dto.getCodigo());
        }

        // Buscar categoría
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", dto.getCategoriaId()));

        Producto producto = Producto.builder()
                .codigo(dto.getCodigo())
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .precio(dto.getPrecio())
                .precioOriginal(dto.getPrecioOriginal())
                .descuento(dto.getDescuento())
                .stock(dto.getStock())
                .stockCritico(dto.getStockCritico() != null ? dto.getStockCritico() : 3)
                .imagen(dto.getImagen())
                .activo(true)
                .categoria(categoria)
                .build();

        producto = productoRepository.save(producto);
        logger.info("Producto creado exitosamente: {}", producto.getId());

        return convertToDTO(producto);
    }

    /**
     * Actualiza un producto existente
     */
    @Transactional
    public ProductoDTO updateProducto(Long id, ProductoDTO dto) {
        logger.info("Actualizando producto: {}", id);

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));

        // Validar código único (si cambió)
        if (!producto.getCodigo().equals(dto.getCodigo()) &&
                productoRepository.existsByCodigo(dto.getCodigo())) {
            throw new BadRequestException("Ya existe un producto con el código: " + dto.getCodigo());
        }

        // Actualizar categoría si cambió
        if (!producto.getCategoria().getId().equals(dto.getCategoriaId())) {
            Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", dto.getCategoriaId()));
            producto.setCategoria(categoria);
        }

        // Actualizar campos
        producto.setCodigo(dto.getCodigo());
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setPrecioOriginal(dto.getPrecioOriginal());
        producto.setDescuento(dto.getDescuento());
        producto.setStock(dto.getStock());
        producto.setStockCritico(dto.getStockCritico());
        producto.setImagen(dto.getImagen());
        producto.setActivo(dto.getActivo());

        producto = productoRepository.save(producto);
        logger.info("Producto actualizado exitosamente: {}", id);

        return convertToDTO(producto);
    }

    /**
     * Elimina un producto (soft delete)
     */
    @Transactional
    public void deleteProducto(Long id) {
        logger.info("Eliminando producto: {}", id);

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));

        producto.setActivo(false);
        productoRepository.save(producto);

        logger.info("Producto eliminado exitosamente: {}", id);
    }

    /**
     * Convierte una entidad Producto a DTO
     */
    private ProductoDTO convertToDTO(Producto producto) {
        return ProductoDTO.builder()
                .id(producto.getId())
                .codigo(producto.getCodigo())
                .nombre(producto.getNombre())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .precioOriginal(producto.getPrecioOriginal())
                .descuento(producto.getDescuento())
                .stock(producto.getStock())
                .stockCritico(producto.getStockCritico())
                .imagen(producto.getImagen())
                .activo(producto.getActivo())
                .categoriaId(producto.getCategoria().getId())
                .categoriaNombre(producto.getCategoria().getNombre())
                .build();
    }
}
