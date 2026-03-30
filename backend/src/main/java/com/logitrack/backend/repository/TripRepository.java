package com.logitrack.backend.repository;

import com.logitrack.backend.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {
}