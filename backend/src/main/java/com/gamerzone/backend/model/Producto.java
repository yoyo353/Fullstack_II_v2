package com.gamerzone.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    private Integer precio;
    private Integer precioOriginal;
    private Integer descuento;
    private Integer stock;
    private Integer stockCritico;
    private String categoria;
    private String imagen;
}
