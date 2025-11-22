package com.gamerzone.tienda.service;

import com.gamerzone.tienda.dto.UsuarioDTO;
import com.gamerzone.tienda.entity.Usuario;
import com.gamerzone.tienda.exception.ResourceNotFoundException;
import com.gamerzone.tienda.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestión de usuarios (solo admin)
 */
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;

    /**
     * Obtiene todos los usuarios
     */
    @Transactional(readOnly = true)
    public List<UsuarioDTO> getAllUsuarios() {
        logger.debug("Obteniendo todos los usuarios");
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene usuarios activos
     */
    @Transactional(readOnly = true)
    public List<UsuarioDTO> getUsuariosActivos() {
        logger.debug("Obteniendo usuarios activos");
        return usuarioRepository.findByActivoTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene un usuario por ID
     */
    @Transactional(readOnly = true)
    public UsuarioDTO getUsuarioById(Long id) {
        logger.debug("Obteniendo usuario con ID: {}", id);
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        return convertToDTO(usuario);
    }

    /**
     * Obtiene usuarios por rol
     */
    @Transactional(readOnly = true)
    public List<UsuarioDTO> getUsuariosByRol(String rol) {
        logger.debug("Obteniendo usuarios con rol: {}", rol);
        return usuarioRepository.findByRolAndActivoTrue(rol).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Actualiza el rol de un usuario
     */
    @Transactional
    public UsuarioDTO updateRolUsuario(Long id, String nuevoRol) {
        logger.info("Actualizando rol de usuario {} a {}", id, nuevoRol);

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));

        usuario.setRol(nuevoRol);
        usuario = usuarioRepository.save(usuario);

        logger.info("Rol de usuario actualizado exitosamente");
        return convertToDTO(usuario);
    }

    /**
     * Activa o desactiva un usuario
     */
    @Transactional
    public UsuarioDTO toggleActivoUsuario(Long id) {
        logger.info("Cambiando estado activo de usuario: {}", id);

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));

        usuario.setActivo(!usuario.getActivo());
        usuario = usuarioRepository.save(usuario);

        logger.info("Estado de usuario actualizado exitosamente");
        return convertToDTO(usuario);
    }

    /**
     * Convierte una entidad Usuario a DTO (sin contraseña)
     */
    private UsuarioDTO convertToDTO(Usuario usuario) {
        return UsuarioDTO.builder()
                .id(usuario.getId())
                .email(usuario.getEmail())
                .nombre(usuario.getNombre())
                .run(usuario.getRun())
                .region(usuario.getRegion())
                .comuna(usuario.getComuna())
                .rol(usuario.getRol())
                .activo(usuario.getActivo())
                .build();
    }
}
