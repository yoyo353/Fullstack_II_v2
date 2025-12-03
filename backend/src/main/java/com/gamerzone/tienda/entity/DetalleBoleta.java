package com.gamerzone.tienda.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Entidad DetalleBoleta - Items de cada orden de compra
 */
@Entity
@Table(name = "detalles_boleta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleBoleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    @Column(nullable = false)
    private Integer cantidad;

    @NotNull(message = "El precio unitario es obligatorio")
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @NotNull(message = "El subtotal es obligatorio")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    // Campos adicionales para guardar info del producto en el momento de la compra
    @Column(name = "producto_codigo", length = 20)
    private String productoCodigo;

    @Column(name = "producto_nombre", length = 100)
    private String productoNombre;

    // Relación con Boleta (muchos detalles pertenecen a una boleta)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boleta_id", nullable = false)
    @JsonIgnore
    private Boleta boleta;

    // Relación con Producto (muchos detalles referencian a un producto)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    // Método para calcular el subtotal
    public void calcularSubtotal() {
        if (this.cantidad != null && this.precioUnitario != null) {
            this.subtotal = this.precioUnitario.multiply(BigDecimal.valueOf(this.cantidad));
        }
    }

    // Constructor simplificado
    public DetalleBoleta(Producto producto, Integer cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = producto.getPrecio();
        this.productoCodigo = producto.getCodigo();
        this.productoNombre = producto.getNombre();
        calcularSubtotal();
    }
}
