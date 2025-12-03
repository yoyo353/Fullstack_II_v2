<<<<<<< HEAD
-- Usuarios (Password: 123456)
INSERT INTO usuarios (nombre, email, password, rol) VALUES ('Admin User', 'admin@admin.cl', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOcd7.M.TjK8K', 'ADMIN');
INSERT INTO usuarios (nombre, email, password, rol) VALUES ('Cliente User', 'cliente@gamerzone.cl', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOcd7.M.TjK8K', 'CLIENTE');

-- Productos
INSERT INTO productos (nombre, descripcion, precio, precio_original, descuento, stock, stock_critico, categoria, imagen) VALUES 
('Mouse Gamer RGB', 'Mouse con sensor óptico de alta precisión y luces RGB personalizables.', 25000, 35000, 28, 50, 5, 'Periféricos', 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg'),
('Teclado Mecánico', 'Teclado mecánico con switches azules y retroiluminación.', 45000, 60000, 25, 30, 3, 'Periféricos', 'https://m.media-amazon.com/images/I/71J6c0c0kAL._AC_SL1500_.jpg'),
('Monitor 144Hz', 'Monitor curvo de 24 pulgadas con tasa de refresco de 144Hz.', 180000, 220000, 18, 15, 2, 'Monitores', 'https://m.media-amazon.com/images/I/81v90JtbImL._AC_SL1500_.jpg'),
('Headset 7.1', 'Audífonos con sonido envolvente 7.1 y micrófono con cancelación de ruido.', 35000, 50000, 30, 40, 5, 'Audio', 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg'),
('Silla Gamer', 'Silla ergonómica con soporte lumbar y reclinable 180 grados.', 120000, 150000, 20, 10, 2, 'Mobiliario', 'https://m.media-amazon.com/images/I/61HEqHMkGwL._AC_SL1500_.jpg');
=======
-- ==============================================
-- SCRIPT DE DATOS DE PRUEBA - GAMERZONE
-- Evaluación Parcial 3 - DSY1104
-- ==============================================

-- NOTA: Este script es opcional. Los datos se cargarán mediante DataLoader.java
-- Solo ejecutar si quieres cargar datos manualmente

-- ==============================================
-- CATEGORÍAS
-- ==============================================
INSERT INTO categorias (nombre, descripcion, activo, fecha_creacion, fecha_actualizacion)
VALUES
    ('PC Gaming', 'Productos para computadoras gaming', TRUE, NOW(), NOW()),
    ('Audio', 'Auriculares y equipos de audio gaming', TRUE, NOW(), NOW()),
    ('Accesorios', 'Controles, mousepads y otros accesorios', TRUE, NOW(), NOW());

-- ==============================================
-- USUARIOS DE PRUEBA
-- ==============================================
-- Contraseña para todos: "1234" (encriptada con BCrypt)
-- $2a$10$... es el hash BCrypt de "1234"

INSERT INTO usuarios (email, password, nombre, run, region, comuna, rol, activo, fecha_creacion, fecha_actualizacion)
VALUES
    -- Admin
    ('admin@admin.cl', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J5PeYp.TkqfCXHZvPq.wBm0cPLCCWC', 'Administrador GZ', '12345678-9', 'RM', 'Santiago', 'ADMIN', TRUE, NOW(), NOW()),

    -- Vendedor
    ('vendedor@gamerzone.cl', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J5PeYp.TkqfCXHZvPq.wBm0cPLCCWC', 'Juan Pérez', '98765432-1', 'Biobío', 'Concepción', 'VENDEDOR', TRUE, NOW(), NOW()),

    -- Clientes
    ('cliente@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J5PeYp.TkqfCXHZvPq.wBm0cPLCCWC', 'María González', '11223344-5', 'Valparaíso', 'Viña del Mar', 'CLIENTE', TRUE, NOW(), NOW()),
    ('cliente2@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J5PeYp.TkqfCXHZvPq.wBm0cPLCCWC', 'Carlos Ramírez', '55667788-9', 'RM', 'Puente Alto', 'CLIENTE', TRUE, NOW(), NOW());

-- ==============================================
-- PRODUCTOS
-- ==============================================
INSERT INTO productos (codigo, nombre, descripcion, precio, precio_original, descuento, stock, stock_critico, imagen, activo, categoria_id, fecha_creacion, fecha_actualizacion)
VALUES
    ('GZ-001', 'Control Pro X', 'Control gaming profesional con retroiluminación RGB', 49990, 69990, 29, 12, 3, 'https://picsum.photos/seed/gamepad/400/200', TRUE, 3, NOW(), NOW()),
    ('GZ-002', 'Mouse GX Ultralight', 'Mouse gaming ultraligero 16000 DPI', 39990, 49990, 20, 6, 2, 'https://picsum.photos/seed/mouse/400/200', TRUE, 1, NOW(), NOW()),
    ('GZ-003', 'Teclado Mecánico TKL', 'Teclado mecánico compacto switches azules', 54990, 64990, 15, 9, 3, 'https://picsum.photos/seed/keyboard/400/200', TRUE, 1, NOW(), NOW()),
    ('GZ-004', 'Headset 7.1', 'Auriculares gaming 7.1 surround', 45990, 59990, 23, 3, 1, 'https://picsum.photos/seed/headset/400/200', TRUE, 2, NOW(), NOW()),
    ('GZ-005', 'Silla Gamer Pro', 'Silla ergonómica para gaming profesional', 199990, 249990, 20, 5, 2, 'https://picsum.photos/seed/chair/400/200', TRUE, 3, NOW(), NOW()),
    ('GZ-006', 'Monitor 27" 144Hz', 'Monitor gaming 27 pulgadas 144Hz 1ms', 299990, 349990, 14, 8, 2, 'https://picsum.photos/seed/monitor/400/200', TRUE, 1, NOW(), NOW());

-- ==============================================
-- FIN DEL SCRIPT
-- ==============================================
>>>>>>> 953893f0a477dbcd59b1d455a8744ead0cc2a544
