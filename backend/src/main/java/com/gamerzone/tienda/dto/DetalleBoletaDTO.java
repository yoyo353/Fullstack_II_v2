package com.gamerzone.tienda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO para DetalleBoleta
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleBoletaDTO {

    private Long id;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
    private String productoCodigo;
    private String productoNombre;
    private Long productoId;
}
