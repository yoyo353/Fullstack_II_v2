package com.gamerzone.tienda.service;

import com.gamerzone.tienda.dto.CategoriaDTO;
import com.gamerzone.tienda.entity.Categoria;
import com.gamerzone.tienda.exception.BadRequestException;
import com.gamerzone.tienda.exception.ResourceNotFoundException;
import com.gamerzone.tienda.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestión de categorías
 */
@Service
@RequiredArgsConstructor
public class CategoriaService {

    private static final Logger logger = LoggerFactory.getLogger(CategoriaService.class);

    private final CategoriaRepository categoriaRepository;

    /**
     * Obtiene todas las categorías
     */
    @Transactional(readOnly = true)
    public List<CategoriaDTO> getAllCategorias() {
        logger.debug("Obteniendo todas las categorías");
        return categoriaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene categorías activas
     */
    @Transactional(readOnly = true)
    public List<CategoriaDTO> getCategoriasActivas() {
        logger.debug("Obteniendo categorías activas");
        return categoriaRepository.findByActivoTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene una categoría por ID
     */
    @Transactional(readOnly = true)
    public CategoriaDTO getCategoriaById(Long id) {
        logger.debug("Obteniendo categoría con ID: {}", id);
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));
        return convertToDTO(categoria);
    }

    /**
     * Crea una nueva categoría
     */
    @Transactional
    public CategoriaDTO createCategoria(CategoriaDTO dto) {
        logger.info("Creando nueva categoría: {}", dto.getNombre());

        // Validar que el nombre no exista
        if (categoriaRepository.existsByNombre(dto.getNombre())) {
            throw new BadRequestException("Ya existe una categoría con el nombre: " + dto.getNombre());
        }

        Categoria categoria = Categoria.builder()
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .activo(true)
                .build();

        categoria = categoriaRepository.save(categoria);
        logger.info("Categoría creada exitosamente: {}", categoria.getId());

        return convertToDTO(categoria);
    }

    /**
     * Actualiza una categoría existente
     */
    @Transactional
    public CategoriaDTO updateCategoria(Long id, CategoriaDTO dto) {
        logger.info("Actualizando categoría: {}", id);

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));

        // Validar nombre único (si cambió)
        if (!categoria.getNombre().equals(dto.getNombre()) &&
                categoriaRepository.existsByNombre(dto.getNombre())) {
            throw new BadRequestException("Ya existe una categoría con el nombre: " + dto.getNombre());
        }

        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setActivo(dto.getActivo());

        categoria = categoriaRepository.save(categoria);
        logger.info("Categoría actualizada exitosamente: {}", id);

        return convertToDTO(categoria);
    }

    /**
     * Elimina una categoría (soft delete)
     */
    @Transactional
    public void deleteCategoria(Long id) {
        logger.info("Eliminando categoría: {}", id);

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));

        categoria.setActivo(false);
        categoriaRepository.save(categoria);

        logger.info("Categoría eliminada exitosamente: {}", id);
    }

    /**
     * Convierte una entidad Categoria a DTO
     */
    private CategoriaDTO convertToDTO(Categoria categoria) {
        return CategoriaDTO.builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .descripcion(categoria.getDescripcion())
                .activo(categoria.getActivo())
                .build();
    }
}
