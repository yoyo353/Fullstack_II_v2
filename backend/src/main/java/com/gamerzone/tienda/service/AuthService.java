package com.gamerzone.tienda.service;

import com.gamerzone.tienda.dto.AuthResponse;
import com.gamerzone.tienda.dto.LoginRequest;
import com.gamerzone.tienda.dto.RegisterRequest;
import com.gamerzone.tienda.entity.Usuario;
import com.gamerzone.tienda.exception.BadRequestException;
import com.gamerzone.tienda.repository.UsuarioRepository;
import com.gamerzone.tienda.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de autenticación y registro
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    /**
     * Autentica un usuario y retorna un token JWT
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        logger.info("Intentando autenticar usuario: {}", request.getEmail());

        // Autenticar con Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generar token JWT
        String jwt = tokenProvider.generateToken(authentication);

        // Obtener datos del usuario
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Usuario no encontrado"));

        logger.info("Usuario autenticado exitosamente: {}", request.getEmail());

        return new AuthResponse(
                jwt,
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getRol()
        );
    }

    /**
     * Registra un nuevo usuario
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        logger.info("Registrando nuevo usuario: {}", request.getEmail());

        // Validar que el email no esté registrado
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("El email ya está registrado");
        }

        // Determinar el rol según el email
        String rol = request.getEmail().endsWith("@admin.cl") ? "ADMIN" : "CLIENTE";

        // Crear usuario
        Usuario usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .run(request.getRun())
                .region(request.getRegion())
                .comuna(request.getComuna())
                .rol(rol)
                .activo(true)
                .build();

        usuario = usuarioRepository.save(usuario);

        // Generar token JWT
        String jwt = tokenProvider.generateTokenFromEmail(
                usuario.getEmail(),
                usuario.getId(),
                usuario.getNombre(),
                usuario.getRol()
        );

        logger.info("Usuario registrado exitosamente: {} con rol: {}", request.getEmail(), rol);

        return new AuthResponse(
                jwt,
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getRol()
        );
    }
}
