package com.gamerzone.tienda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para Boleta
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoletaDTO {

    private Long id;
    private LocalDateTime fecha;
    private BigDecimal total;
    private String estado;
    private String metodoPago;
    private String notas;
    private Long usuarioId;
    private String usuarioNombre;
    private String usuarioEmail;
    private List<DetalleBoletaDTO> detalles;
}
