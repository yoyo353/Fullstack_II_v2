package com.gamerzone.backend.service;

import com.gamerzone.backend.config.JwtUtil;
import com.gamerzone.backend.model.Rol;
import com.gamerzone.backend.model.Usuario;
import com.gamerzone.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    public Map<String, Object> register(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        // Asignar rol basado en el email (regla de negocio simple)
        if (usuario.getEmail().endsWith("@admin.cl")) {
            usuario.setRol(Rol.ADMIN);
        } else {
            usuario.setRol(Rol.CLIENTE);
        }

        Usuario savedUser = usuarioRepository.save(usuario);
        
        // Generar token automáticamente al registrarse
        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", token);
        return response;
    }

    public Map<String, Object> login(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails);
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();

        Map<String, Object> response = new HashMap<>();
        response.put("user", usuario);
        response.put("token", token);
        return response;
    }
}
