package com.gamerzone.tienda.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Usuario - Gestión de usuarios del sistema
 */
@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Email debe ser válido")
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 4, max = 255, message = "Contraseña debe tener entre 4 y 10 caracteres")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 12)
    private String run;

    @Column(length = 50)
    private String region;

    @Column(length = 50)
    private String comuna;

    @NotBlank(message = "El rol es obligatorio")
    @Column(nullable = false, length = 20)
    private String rol; // ADMIN, VENDEDOR, CLIENTE

    @Column(name = "activo")
    private Boolean activo = true;

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    // Relación con Boletas (un usuario puede tener muchas boletas)
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Boleta> boletas = new ArrayList<>();

    // Constructor sin ID para creación
    public Usuario(String email, String password, String nombre, String run,
                   String region, String comuna, String rol) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.run = run;
        this.region = region;
        this.comuna = comuna;
        this.rol = rol;
        this.activo = true;
    }
}
