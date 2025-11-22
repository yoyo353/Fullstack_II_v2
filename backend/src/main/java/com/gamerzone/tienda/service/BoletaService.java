package com.gamerzone.tienda.service;

import com.gamerzone.tienda.dto.BoletaDTO;
import com.gamerzone.tienda.dto.CrearBoletaRequest;
import com.gamerzone.tienda.dto.DetalleBoletaDTO;
import com.gamerzone.tienda.entity.Boleta;
import com.gamerzone.tienda.entity.DetalleBoleta;
import com.gamerzone.tienda.entity.Producto;
import com.gamerzone.tienda.entity.Usuario;
import com.gamerzone.tienda.exception.BadRequestException;
import com.gamerzone.tienda.exception.ResourceNotFoundException;
import com.gamerzone.tienda.repository.BoletaRepository;
import com.gamerzone.tienda.repository.ProductoRepository;
import com.gamerzone.tienda.repository.UsuarioRepository;
import com.gamerzone.tienda.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestión de boletas (órdenes de compra)
 */
@Service
@RequiredArgsConstructor
public class BoletaService {

    private static final Logger logger = LoggerFactory.getLogger(BoletaService.class);

    private final BoletaRepository boletaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    /**
     * Obtiene todas las boletas (solo admin)
     */
    @Transactional(readOnly = true)
    public List<BoletaDTO> getAllBoletas() {
        logger.debug("Obteniendo todas las boletas");
        return boletaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene las boletas del usuario autenticado
     */
    @Transactional(readOnly = true)
    public List<BoletaDTO> getBoletasUsuarioActual() {
        Long usuarioId = getCurrentUserId();
        logger.debug("Obteniendo boletas del usuario: {}", usuarioId);

        return boletaRepository.findByUsuarioIdOrderByFechaDesc(usuarioId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene una boleta por ID
     */
    @Transactional(readOnly = true)
    public BoletaDTO getBoletaById(Long id) {
        logger.debug("Obteniendo boleta con ID: {}", id);

        Boleta boleta = boletaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Boleta", "id", id));

        // Verificar que el usuario tenga permiso para ver esta boleta
        Long usuarioId = getCurrentUserId();
        String rol = getCurrentUserRole();

        if (!rol.equals("ADMIN") && !boleta.getUsuario().getId().equals(usuarioId)) {
            throw new BadRequestException("No tiene permisos para ver esta boleta");
        }

        return convertToDTO(boleta);
    }

    /**
     * Crea una nueva boleta
     */
    @Transactional
    public BoletaDTO createBoleta(CrearBoletaRequest request) {
        Long usuarioId = getCurrentUserId();
        logger.info("Creando boleta para usuario: {}", usuarioId);

        // Obtener usuario
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", usuarioId));

        // Crear boleta
        Boleta boleta = new Boleta();
        boleta.setUsuario(usuario);
        boleta.setFecha(LocalDateTime.now());
        boleta.setEstado("PENDIENTE");
        boleta.setMetodoPago(request.getMetodoPago());
        boleta.setNotas(request.getNotas());
        boleta.setTotal(BigDecimal.ZERO);

        // Agregar items
        for (CrearBoletaRequest.ItemBoletaRequest item : request.getItems()) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", item.getProductoId()));

            // Validar stock
            if (producto.getStock() < item.getCantidad()) {
                throw new BadRequestException(
                        "Stock insuficiente para el producto: " + producto.getNombre() +
                                ". Disponible: " + producto.getStock()
                );
            }

            // Crear detalle
            DetalleBoleta detalle = new DetalleBoleta(producto, item.getCantidad());
            boleta.agregarDetalle(detalle);

            // Reducir stock
            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);
        }

        // Calcular total
        boleta.calcularTotal();

        boleta = boletaRepository.save(boleta);
        logger.info("Boleta creada exitosamente: {} con total: {}", boleta.getId(), boleta.getTotal());

        return convertToDTO(boleta);
    }

    /**
     * Actualiza el estado de una boleta
     */
    @Transactional
    public BoletaDTO updateEstadoBoleta(Long id, String nuevoEstado) {
        logger.info("Actualizando estado de boleta {} a {}", id, nuevoEstado);

        Boleta boleta = boletaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Boleta", "id", id));

        // Validar estados permitidos
        List<String> estadosPermitidos = List.of("PENDIENTE", "PAGADA", "CANCELADA", "ENVIADA", "ENTREGADA");
        if (!estadosPermitidos.contains(nuevoEstado)) {
            throw new BadRequestException("Estado no válido: " + nuevoEstado);
        }

        boleta.setEstado(nuevoEstado);
        boleta = boletaRepository.save(boleta);

        logger.info("Estado de boleta actualizado exitosamente");
        return convertToDTO(boleta);
    }

    /**
     * Obtiene el ID del usuario autenticado
     */
    private Long getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userDetails.getId();
    }

    /**
     * Obtiene el rol del usuario autenticado
     */
    private String getCurrentUserRole() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userDetails.getRol();
    }

    /**
     * Convierte una entidad Boleta a DTO
     */
    private BoletaDTO convertToDTO(Boleta boleta) {
        return BoletaDTO.builder()
                .id(boleta.getId())
                .fecha(boleta.getFecha())
                .total(boleta.getTotal())
                .estado(boleta.getEstado())
                .metodoPago(boleta.getMetodoPago())
                .notas(boleta.getNotas())
                .usuarioId(boleta.getUsuario().getId())
                .usuarioNombre(boleta.getUsuario().getNombre())
                .usuarioEmail(boleta.getUsuario().getEmail())
                .detalles(boleta.getDetalles().stream()
                        .map(this::convertDetalleToDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    /**
     * Convierte una entidad DetalleBoleta a DTO
     */
    private DetalleBoletaDTO convertDetalleToDTO(DetalleBoleta detalle) {
        return DetalleBoletaDTO.builder()
                .id(detalle.getId())
                .cantidad(detalle.getCantidad())
                .precioUnitario(detalle.getPrecioUnitario())
                .subtotal(detalle.getSubtotal())
                .productoCodigo(detalle.getProductoCodigo())
                .productoNombre(detalle.getProductoNombre())
                .productoId(detalle.getProducto().getId())
                .build();
    }
}
