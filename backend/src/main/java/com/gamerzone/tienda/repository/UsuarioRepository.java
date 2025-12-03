package com.gamerzone.tienda.repository;

import com.gamerzone.tienda.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Usuario
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por email
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si existe un usuario con el email dado
     */
    boolean existsByEmail(String email);

    /**
     * Busca usuarios por rol
     */
    List<Usuario> findByRol(String rol);

    /**
     * Busca usuarios activos
     */
    List<Usuario> findByActivoTrue();

    /**
     * Busca usuarios por rol y activos
     */
    List<Usuario> findByRolAndActivoTrue(String rol);

    /**
     * Busca usuarios por nombre (búsqueda parcial)
     */
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
}
