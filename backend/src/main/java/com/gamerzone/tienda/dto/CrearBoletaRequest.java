package com.gamerzone.tienda.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO para crear una nueva boleta
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearBoletaRequest {

    @NotEmpty(message = "Debe incluir al menos un item")
    private List<ItemBoletaRequest> items;

    private String metodoPago;
    private String notas;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemBoletaRequest {

        @NotNull(message = "El ID del producto es obligatorio")
        private Long productoId;

        @NotNull(message = "La cantidad es obligatoria")
        private Integer cantidad;
    }
}
