-- Base de datos simple para registro de trading
DROP DATABASE IF EXISTS trading_journal;
CREATE DATABASE trading_journal;
USE trading_journal;

-- Tabla de trades
CREATE TABLE trades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    activo VARCHAR(20) NOT NULL,
    tipo ENUM('compra', 'venta') NOT NULL,
    lotaje DECIMAL(10, 2) NOT NULL,
    precio_entrada DECIMAL(15, 6) NOT NULL,
    precio_salida DECIMAL(15, 6) NOT NULL,
    ganancia DECIMAL(15, 2) NOT NULL,
    comentario TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha)
);

-- Tabla de resumen diario (para el calendario)
CREATE TABLE resumen_diario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL UNIQUE,
    trades_totales INT DEFAULT 0,
    ganancia_total DECIMAL(15, 2) DEFAULT 0,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha)
);

-- Procedimiento para actualizar resumen diario automáticamente
DELIMITER //
CREATE PROCEDURE actualizar_resumen(IN p_fecha DATE)
BEGIN
    INSERT INTO resumen_diario (fecha, trades_totales, ganancia_total)
    SELECT 
        p_fecha,
        COUNT(*) as trades_totales,
        SUM(ganancia) as ganancia_total
    FROM trades
    WHERE fecha = p_fecha
    ON DUPLICATE KEY UPDATE
        trades_totales = VALUES(trades_totales),
        ganancia_total = VALUES(ganancia_total);
END //
DELIMITER ;