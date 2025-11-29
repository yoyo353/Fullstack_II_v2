package com.gamerzone.backend.controller;

import com.gamerzone.backend.model.Boleta;
import com.gamerzone.backend.model.DetalleBoleta;
import com.gamerzone.backend.service.BoletaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boletas")
public class BoletaController {

    @Autowired
    private BoletaService boletaService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody List<DetalleBoleta> detalles) {
        try {
            return ResponseEntity.ok(boletaService.crearBoleta(detalles));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/mis-boletas")
    public List<Boleta> misBoletas() {
        return boletaService.obtenerMisBoletas();
    }
}
