package com.logitrack.backend.controller;

import com.logitrack.backend.entity.Maintenance;
import com.logitrack.backend.repository.MaintenanceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "https://pro-logitrack.vercel.app")
@RestController
@RequestMapping("/maintenances")
public class MaintenanceController {

    private final MaintenanceRepository repository;

    public MaintenanceController(MaintenanceRepository repository) {
        this.repository = repository;
    }

    // GET (all)
    @GetMapping
    public List<Maintenance> getAll() {
        return repository.findAll();
    }

    // GET por id
    @GetMapping("/{id}")
    public Maintenance getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    // POST 
    @PostMapping
    public Maintenance create(@RequestBody Maintenance maintenance) {
        return repository.save(maintenance);
    }

    // PUT
    @PutMapping("/{id}")
    public Maintenance update(@PathVariable Long id, @RequestBody Maintenance updated) {
        Maintenance m = repository.findById(id).orElseThrow();

        m.setDataInicio(updated.getDataInicio());
        m.setDataFinalizacao(updated.getDataFinalizacao());
        m.setTipoServico(updated.getTipoServico());
        m.setCustoEstimado(updated.getCustoEstimado());
        m.setStatus(updated.getStatus());
        m.setVehicle(updated.getVehicle());

        return repository.save(m);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}