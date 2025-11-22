package com.gamerzone.tienda.exception;

/**
 * Excepción lanzada cuando la petición es inválida
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
