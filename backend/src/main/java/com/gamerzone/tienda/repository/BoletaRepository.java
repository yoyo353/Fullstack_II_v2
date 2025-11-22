package com.gamerzone.tienda.repository;

import com.gamerzone.tienda.entity.Boleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repositorio para la entidad Boleta
 */
@Repository
public interface BoletaRepository extends JpaRepository<Boleta, Long> {

    /**
     * Busca boletas por usuario
     */
    List<Boleta> findByUsuarioId(Long usuarioId);

    /**
     * Busca boletas por estado
     */
    List<Boleta> findByEstado(String estado);

    /**
     * Busca boletas por usuario y estado
     */
    List<Boleta> findByUsuarioIdAndEstado(Long usuarioId, String estado);

    /**
     * Busca boletas por rango de fechas
     */
    @Query("SELECT b FROM Boleta b WHERE b.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY b.fecha DESC")
    List<Boleta> findByFechaBetween(@Param("fechaInicio") LocalDateTime fechaInicio,
                                    @Param("fechaFin") LocalDateTime fechaFin);

    /**
     * Busca las últimas boletas ordenadas por fecha
     */
    List<Boleta> findTop10ByOrderByFechaDesc();

    /**
     * Busca boletas del usuario ordenadas por fecha descendente
     */
    List<Boleta> findByUsuarioIdOrderByFechaDesc(Long usuarioId);

    /**
     * Cuenta boletas por estado
     */
    long countByEstado(String estado);

    /**
     * Cuenta boletas de un usuario
     */
    long countByUsuarioId(Long usuarioId);
}
