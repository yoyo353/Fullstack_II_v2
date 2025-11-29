package com.gamerzone.backend.service;

import com.gamerzone.backend.model.Boleta;
import com.gamerzone.backend.model.DetalleBoleta;
import com.gamerzone.backend.model.Producto;
import com.gamerzone.backend.model.Usuario;
import com.gamerzone.backend.repository.BoletaRepository;
import com.gamerzone.backend.repository.ProductoRepository;
import com.gamerzone.backend.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoletaService {

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public Boleta crearBoleta(List<DetalleBoleta> detalles) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Boleta boleta = new Boleta();
        boleta.setUsuario(usuario);
        boleta.setFecha(LocalDateTime.now());
        
        int total = 0;

        for (DetalleBoleta detalle : detalles) {
            Producto producto = productoRepository.findById(detalle.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            
            if (producto.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }

            // Descontar stock
            producto.setStock(producto.getStock() - detalle.getCantidad());
            productoRepository.save(producto);

            detalle.setBoleta(boleta);
            detalle.setPrecioUnitario(producto.getPrecio());
            total += producto.getPrecio() * detalle.getCantidad();
        }

        boleta.setDetalles(detalles);
        boleta.setTotal(total);

        return boletaRepository.save(boleta);
    }

    public List<Boleta> obtenerMisBoletas() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return boletaRepository.findByUsuarioId(usuario.getId());
    }
}
