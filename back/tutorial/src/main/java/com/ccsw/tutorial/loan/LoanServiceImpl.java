package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.ClientService;
import com.ccsw.tutorial.common.criteria.SearchCriteria;
import com.ccsw.tutorial.game.GameService;
import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

    @Autowired
    LoanRepository loanRepository;
    @Autowired
    GameService gameService;
    @Autowired
    ClientService clientService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<Loan> findPage(LoanSearchDto dto, String gameTitle, String clientName, LocalDate date) {
        LoanSpecification gameTitleSpec = new LoanSpecification(new SearchCriteria("game.title", ":", gameTitle));
        LoanSpecification clientNameSpec = new LoanSpecification(new SearchCriteria("client.name", ":", clientName));
        LoanSpecification startDateSpec = new LoanSpecification(new SearchCriteria("startDate", ">=", date));
        Specification<Loan> spec = Specification.where(gameTitleSpec).and(clientNameSpec).and(startDateSpec);
        Pageable pageable = dto.getPageable().getPageable();
        return this.loanRepository.findAll(spec, pageable);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void save(LoanDto dto) {
        Loan loan = new Loan();
        loan.setClient(dto.getClient());
        loan.setGame(dto.getGame());
        loan.setStartDate(dto.getStartDate());
        loan.setEndDate(dto.getEndDate());

        if (isLoaned(dto)) {
            throw new IllegalArgumentException("El juego ya está prestado en las fechas seleccionadas.");
        }

        if (clientMore2Games(dto)) {
            throw new IllegalArgumentException("El cliente ya tiene más de dos préstamos en las fechas seleccionadas.");
        }

        this.loanRepository.save(loan);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Long id) throws Exception {
        if (this.loanRepository.findById(id).orElse(null) == null) {
            throw new Exception("Not Exists");
        }
        this.loanRepository.deleteById(id);
    }

    private boolean isLoaned(LoanDto dto) {
        Iterable<Loan> loans = this.loanRepository.findAll();
        for (Loan existLoan : loans) {
            if (existLoan.getGame().getId().equals(dto.getGame().getId()) &&
                    (!existLoan.getClient().getName().equals(dto.getClient().getName())) &&
                    !existLoan.getEndDate().isBefore(dto.getStartDate()) &&
                    !existLoan.getStartDate().isAfter(dto.getEndDate())) {
                return true;
            }
        }
        return false;
    }

    private boolean clientMore2Games(LoanDto dto) {
        Iterable<Loan> loans = this.loanRepository.findAll();
        int count = 0;
        for (Loan existLoan : loans) {
            String clientLoan = existLoan.getClient().getName();
            Boolean res1 = existLoan.getEndDate().isBefore(dto.getStartDate());
            Boolean res2 = existLoan.getStartDate().isAfter(dto.getEndDate());

            if (existLoan.getClient().getId().equals(dto.getClient().getId())) {
                // Verificar si las fechas se solapan
                if (!existLoan.getEndDate().isBefore(dto.getStartDate()) &&
                        !existLoan.getStartDate().isAfter(dto.getEndDate())) {
                    count++;
                    if (count >= 2) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
