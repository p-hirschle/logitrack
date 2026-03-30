package com.logitrack.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "manutencoes")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Vehicle vehicle;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_finalizacao")
    private LocalDate dataFinalizacao;

    @Column(name = "tipo_servico")
    private String tipoServico;

    @Column(name = "custo_estimado")
    private BigDecimal custoEstimado;

    private String status;
}