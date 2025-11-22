package com.gamerzone.tienda.repository;

import com.gamerzone.tienda.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Producto
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busca un producto por código
     */
    Optional<Producto> findByCodigo(String codigo);

    /**
     * Verifica si existe un producto con el código dado
     */
    boolean existsByCodigo(String codigo);

    /**
     * Busca productos por categoría
     */
    List<Producto> findByCategoriaId(Long categoriaId);

    /**
     * Busca productos activos
     */
    List<Producto> findByActivoTrue();

    /**
     * Busca productos por categoría y activos
     */
    List<Producto> findByCategoriaIdAndActivoTrue(Long categoriaId);

    /**
     * Busca productos por nombre (búsqueda parcial)
     */
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    /**
     * Busca productos con stock bajo (menor o igual al stock crítico)
     */
    @Query("SELECT p FROM Producto p WHERE p.stock <= p.stockCritico AND p.activo = true")
    List<Producto> findProductosConStockBajo();

    /**
     * Busca productos disponibles (activos y con stock)
     */
    @Query("SELECT p FROM Producto p WHERE p.activo = true AND p.stock > 0")
    List<Producto> findProductosDisponibles();

    /**
     * Busca productos por nombre o código
     */
    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) " +
           "OR LOWER(p.codigo) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Producto> buscarPorNombreOCodigo(@Param("termino") String termino);
}
