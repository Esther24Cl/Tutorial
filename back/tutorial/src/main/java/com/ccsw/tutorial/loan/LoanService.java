package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

/**
 * @author mcolmena
 */
public interface LoanService {

    /**
     * Método para recuperar un listado paginado de {@link Loan} filtrando opcionalmente por
     * el título del juego y/o el nombre del cliente y/o una fecha determinada
     *
     * @param dto dto de búsqueda
     * @return {@link Page} de {@link Loan}
     */
    Page<Loan> findPage(LoanSearchDto dto, String gameTitle, String clientName, LocalDate date);

    /**
     * Método para crear o actualizar un {@link Loan}
     *
     * @param dto datos de la entidad
     */
    void save(LoanDto dto);

    /**
     * Método para crear o actualizar un {@link Loan}
     *
     * @param id PK de la entidad
     */
    void delete(Long id) throws Exception;
}
