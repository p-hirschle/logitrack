package com.logitrack.backend.controller;

import com.logitrack.backend.entity.Vehicle;
import com.logitrack.backend.repository.VehicleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "https://pro-logitrack.vercel.app")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private final VehicleRepository repository;

    public VehicleController(VehicleRepository repository) {
        this.repository = repository;
    }

    // GET (all)
    @GetMapping
    public List<Vehicle> getAll() {
        return repository.findAll();
    }
}