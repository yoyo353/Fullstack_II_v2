package com.gamerzone.tienda.repository;

import com.gamerzone.tienda.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Categoria
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    /**
     * Busca una categoría por nombre
     */
    Optional<Categoria> findByNombre(String nombre);

    /**
     * Verifica si existe una categoría con el nombre dado
     */
    boolean existsByNombre(String nombre);

    /**
     * Busca categorías activas
     */
    List<Categoria> findByActivoTrue();

    /**
     * Busca categorías por nombre (búsqueda parcial)
     */
    List<Categoria> findByNombreContainingIgnoreCase(String nombre);
}
