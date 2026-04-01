package com.logitrack.backend.service;

import com.logitrack.backend.dto.DashboardDTO;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    private final EntityManager em;

    public DashboardService(EntityManager em) {
        this.em = em;
    }

    public DashboardDTO getDashboard() {

        DashboardDTO dto = new DashboardDTO();

        // total KM
        BigDecimal totalKm = (BigDecimal) em.createNativeQuery(
                "SELECT COALESCE(SUM(km_percorrida),0) FROM viagens"
        ).getSingleResult();

        dto.setTotalKm(totalKm);

        // volume por categoria
        List<Object[]> volume = em.createNativeQuery("""
            SELECT v.tipo, COUNT(*)
            FROM viagens vi
            JOIN veiculos v ON vi.veiculo_id = v.id
            GROUP BY v.tipo
        """).getResultList();

        dto.setVolumePorCategoria(volume);

        // próximas manutenções
        List<Object[]> manutencoes = em.createNativeQuery("""
            SELECT m.id, m.data_inicio, m.tipo_servico, m.status
            FROM manutencoes m
            WHERE m.data_inicio >= CURRENT_DATE
            ORDER BY m.data_inicio
            LIMIT 5
        """).getResultList();

        dto.setProximasManutencoes(manutencoes);

        // ranking de utilização
        List<Object[]> ranking = em.createNativeQuery("""
            SELECT v.modelo, SUM(vi.km_percorrida) as total
            FROM viagens vi
            JOIN veiculos v ON vi.veiculo_id = v.id
            GROUP BY v.id
            ORDER BY total DESC
            LIMIT 5
        """).getResultList();

        dto.setRanking(ranking);

        // projeção financeira
        BigDecimal projecao = (BigDecimal) em.createNativeQuery("""
            SELECT COALESCE(SUM(custo_estimado),0)
            FROM manutencoes
            WHERE MONTH(data_inicio) = MONTH(CURRENT_DATE)
              AND YEAR(data_inicio) = YEAR(CURRENT_DATE)
        """).getSingleResult();

        dto.setProjecaoFinanceira(projecao);

        return dto;
    }
}