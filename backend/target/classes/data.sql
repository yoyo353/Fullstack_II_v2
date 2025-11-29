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
