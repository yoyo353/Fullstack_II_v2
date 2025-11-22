package com.gamerzone.tienda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Usuario (sin contraseña)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {

    private Long id;
    private String email;
    private String nombre;
    private String run;
    private String region;
    private String comuna;
    private String rol;
    private Boolean activo;
}
