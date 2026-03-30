package com.logitrack.backend.controller;

import com.logitrack.backend.dto.DashboardDTO;
import com.logitrack.backend.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardDTO getDashboard() {
        return service.getDashboard();
    }
}