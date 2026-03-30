package com.logitrack.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class DashboardDTO {

    private BigDecimal totalKm;
    private List<Object[]> volumePorCategoria;
    private List<Object[]> proximasManutencoes;
    private List<Object[]> ranking;
    private BigDecimal projecaoFinanceira;
}