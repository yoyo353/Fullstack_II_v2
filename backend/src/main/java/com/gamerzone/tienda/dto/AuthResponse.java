package com.gamerzone.tienda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuestas de autenticación
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String tipo = "Bearer";
    private Long id;
    private String email;
    private String nombre;
    private String rol;

    public AuthResponse(String token, Long id, String email, String nombre, String rol) {
        this.token = token;
        this.tipo = "Bearer";
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
    }
}
