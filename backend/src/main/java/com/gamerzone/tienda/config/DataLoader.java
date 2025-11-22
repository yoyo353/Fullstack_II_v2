package com.gamerzone.tienda.config;

import com.gamerzone.tienda.entity.Categoria;
import com.gamerzone.tienda.entity.Producto;
import com.gamerzone.tienda.entity.Usuario;
import com.gamerzone.tienda.repository.CategoriaRepository;
import com.gamerzone.tienda.repository.ProductoRepository;
import com.gamerzone.tienda.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Carga datos iniciales en la base de datos al iniciar la aplicación
 */
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Solo cargar datos si la base de datos está vacía
        if (categoriaRepository.count() == 0) {
            logger.info("📦 Cargando datos iniciales...");
            cargarCategorias();
            cargarProductos();
            cargarUsuarios();
            logger.info("✅ Datos iniciales cargados exitosamente!");
        } else {
            logger.info("ℹ️ La base de datos ya contiene datos. Omitiendo carga inicial.");
        }
    }

    private void cargarCategorias() {
        logger.info("Cargando categorías...");

        Categoria pcGaming = Categoria.builder()
                .nombre("PC Gaming")
                .descripcion("Productos para computadoras gaming")
                .activo(true)
                .build();

        Categoria audio = Categoria.builder()
                .nombre("Audio")
                .descripcion("Auriculares y equipos de audio gaming")
                .activo(true)
                .build();

        Categoria accesorios = Categoria.builder()
                .nombre("Accesorios")
                .descripcion("Controles, mousepads y otros accesorios")
                .activo(true)
                .build();

        categoriaRepository.save(pcGaming);
        categoriaRepository.save(audio);
        categoriaRepository.save(accesorios);

        logger.info("✓ 3 categorías cargadas");
    }

    private void cargarProductos() {
        logger.info("Cargando productos...");

        Categoria pcGaming = categoriaRepository.findByNombre("PC Gaming").orElseThrow();
        Categoria audio = categoriaRepository.findByNombre("Audio").orElseThrow();
        Categoria accesorios = categoriaRepository.findByNombre("Accesorios").orElseThrow();

        Producto[] productos = {
                Producto.builder()
                        .codigo("GZ-001")
                        .nombre("Control Pro X")
                        .descripcion("Control gaming profesional con retroiluminación RGB")
                        .precio(new BigDecimal("49990"))
                        .precioOriginal(new BigDecimal("69990"))
                        .descuento(29)
                        .stock(12)
                        .stockCritico(3)
                        .imagen("https://picsum.photos/seed/gamepad/400/200")
                        .activo(true)
                        .categoria(accesorios)
                        .build(),

                Producto.builder()
                        .codigo("GZ-002")
                        .nombre("Mouse GX Ultralight")
                        .descripcion("Mouse gaming ultraligero 16000 DPI")
                        .precio(new BigDecimal("39990"))
                        .precioOriginal(new BigDecimal("49990"))
                        .descuento(20)
                        .stock(6)
                        .stockCritico(2)
                        .imagen("https://picsum.photos/seed/mouse/400/200")
                        .activo(true)
                        .categoria(pcGaming)
                        .build(),

                Producto.builder()
                        .codigo("GZ-003")
                        .nombre("Teclado Mecánico TKL")
                        .descripcion("Teclado mecánico compacto switches azules")
                        .precio(new BigDecimal("54990"))
                        .precioOriginal(new BigDecimal("64990"))
                        .descuento(15)
                        .stock(9)
                        .stockCritico(3)
                        .imagen("https://picsum.photos/seed/keyboard/400/200")
                        .activo(true)
                        .categoria(pcGaming)
                        .build(),

                Producto.builder()
                        .codigo("GZ-004")
                        .nombre("Headset 7.1")
                        .descripcion("Auriculares gaming 7.1 surround")
                        .precio(new BigDecimal("45990"))
                        .precioOriginal(new BigDecimal("59990"))
                        .descuento(23)
                        .stock(3)
                        .stockCritico(1)
                        .imagen("https://picsum.photos/seed/headset/400/200")
                        .activo(true)
                        .categoria(audio)
                        .build(),

                Producto.builder()
                        .codigo("GZ-005")
                        .nombre("Silla Gamer Pro")
                        .descripcion("Silla ergonómica para gaming profesional")
                        .precio(new BigDecimal("199990"))
                        .precioOriginal(new BigDecimal("249990"))
                        .descuento(20)
                        .stock(5)
                        .stockCritico(2)
                        .imagen("https://picsum.photos/seed/chair/400/200")
                        .activo(true)
                        .categoria(accesorios)
                        .build(),

                Producto.builder()
                        .codigo("GZ-006")
                        .nombre("Monitor 27\" 144Hz")
                        .descripcion("Monitor gaming 27 pulgadas 144Hz 1ms")
                        .precio(new BigDecimal("299990"))
                        .precioOriginal(new BigDecimal("349990"))
                        .descuento(14)
                        .stock(8)
                        .stockCritico(2)
                        .imagen("https://picsum.photos/seed/monitor/400/200")
                        .activo(true)
                        .categoria(pcGaming)
                        .build()
        };

        for (Producto producto : productos) {
            productoRepository.save(producto);
        }

        logger.info("✓ {} productos cargados", productos.length);
    }

    private void cargarUsuarios() {
        logger.info("Cargando usuarios de prueba...");

        // Contraseña: "1234" para todos los usuarios
        String passwordEncriptada = passwordEncoder.encode("1234");

        Usuario[] usuarios = {
                Usuario.builder()
                        .email("admin@admin.cl")
                        .password(passwordEncriptada)
                        .nombre("Administrador GZ")
                        .run("12345678-9")
                        .region("RM")
                        .comuna("Santiago")
                        .rol("ADMIN")
                        .activo(true)
                        .build(),

                Usuario.builder()
                        .email("vendedor@gamerzone.cl")
                        .password(passwordEncriptada)
                        .nombre("Juan Pérez")
                        .run("98765432-1")
                        .region("Biobío")
                        .comuna("Concepción")
                        .rol("VENDEDOR")
                        .activo(true)
                        .build(),

                Usuario.builder()
                        .email("cliente@gmail.com")
                        .password(passwordEncriptada)
                        .nombre("María González")
                        .run("11223344-5")
                        .region("Valparaíso")
                        .comuna("Viña del Mar")
                        .rol("CLIENTE")
                        .activo(true)
                        .build(),

                Usuario.builder()
                        .email("cliente2@gmail.com")
                        .password(passwordEncriptada)
                        .nombre("Carlos Ramírez")
                        .run("55667788-9")
                        .region("RM")
                        .comuna("Puente Alto")
                        .rol("CLIENTE")
                        .activo(true)
                        .build()
        };

        for (Usuario usuario : usuarios) {
            usuarioRepository.save(usuario);
        }

        logger.info("✓ {} usuarios cargados", usuarios.length);
        logger.info("");
        logger.info("==============================================");
        logger.info("📋 USUARIOS DE PRUEBA (Contraseña: 1234)");
        logger.info("==============================================");
        logger.info("👤 ADMIN:    admin@admin.cl");
        logger.info("👤 VENDEDOR: vendedor@gamerzone.cl");
        logger.info("👤 CLIENTE:  cliente@gmail.com");
        logger.info("👤 CLIENTE:  cliente2@gmail.com");
        logger.info("==============================================");
        logger.info("");
    }
}
