package com.gamerzone.tienda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO para Producto
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoDTO {

    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private BigDecimal precioOriginal;
    private Integer descuento;
    private Integer stock;
    private Integer stockCritico;
    private String imagen;
    private Boolean activo;
    private Long categoriaId;
    private String categoriaNombre;
}
