package com.gamerzone.tienda.repository;

import com.gamerzone.tienda.entity.DetalleBoleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad DetalleBoleta
 */
@Repository
public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Long> {

    /**
     * Busca detalles por boleta
     */
    List<DetalleBoleta> findByBoletaId(Long boletaId);

    /**
     * Busca detalles por producto
     */
    List<DetalleBoleta> findByProductoId(Long productoId);

    /**
     * Obtiene los productos más vendidos
     */
    @Query("SELECT d.producto.id, d.producto.nombre, SUM(d.cantidad) as total " +
           "FROM DetalleBoleta d " +
           "GROUP BY d.producto.id, d.producto.nombre " +
           "ORDER BY total DESC")
    List<Object[]> findProductosMasVendidos();
}
