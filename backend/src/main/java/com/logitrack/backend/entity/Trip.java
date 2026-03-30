package com.logitrack.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "viagens")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Vehicle vehicle;

    @Column(name = "data_saida")
    private LocalDateTime dataSaida;

    @Column(name = "data_chegada")
    private LocalDateTime dataChegada;

    private String origem;
    private String destino;

    @Column(name = "km_percorrida")
    private BigDecimal kmPercorrida;
}