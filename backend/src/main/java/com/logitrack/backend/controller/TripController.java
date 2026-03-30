package com.logitrack.backend.controller;

import com.logitrack.backend.entity.Trip;
import com.logitrack.backend.repository.TripRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/trips")
public class TripController {

    private final TripRepository repository;

    public TripController(TripRepository repository) {
        this.repository = repository;
    }

    // GET (all)
    @GetMapping
    public List<Trip> getAll() {
        return repository.findAll();
    }

    // GET por id
    @GetMapping("/{id}")
    public Trip getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    // POST
    @PostMapping
    public Trip create(@RequestBody Trip trip) {
        return repository.save(trip);
    }

    // PUT
    @PutMapping("/{id}")
    public Trip update(@PathVariable Long id, @RequestBody Trip updated) {
        Trip t = repository.findById(id).orElseThrow();

        t.setVehicle(updated.getVehicle());
        t.setDataSaida(updated.getDataSaida());
        t.setDataChegada(updated.getDataChegada());
        t.setOrigem(updated.getOrigem());
        t.setDestino(updated.getDestino());
        t.setKmPercorrida(updated.getKmPercorrida());

        return repository.save(t);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
