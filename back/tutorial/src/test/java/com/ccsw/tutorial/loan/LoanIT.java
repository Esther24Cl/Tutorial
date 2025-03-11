package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.common.pagination.PageableRequest;
import com.ccsw.tutorial.config.ResponsePage;
import com.ccsw.tutorial.game.model.Game;
import com.ccsw.tutorial.loan.model.LoanDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class LoanIT {
    public static final String LOCALHOST = "http://localhost:";
    public static final String SERVICE_PATH = "/loan";

    public static final Long DELETE_LOAN_ID = 6L;
    public static final Long EXISTS_LOAN_ID = 3L;
    public static final String EXISTS_GAME_TITLE = "On Mars";
    public static final String NEW_GAME_TITLE = "Aventureros al tren";
    public static final Game NEW_GAME = new Game();
    public static final String EXISTS_CLIENT_NAME = "Alice Johnson";
    public static final String NEW_CLIENT_NAME = "Bob Smith";
    public static final String NEW_CLIENT_NAME_2 = "You Smith";
    public static final Client NEW_CLIENT = new Client();
    public static final String EXISTS_DATE = "2025-03-01";
    public static final LocalDate NEW_DATE = LocalDate.of(2025, 04, 02);
    public static final Date EXISTS_END_DATE = new Date(2025, 4, 25);
    public static final LocalDate NEW_END_DATE = LocalDate.of(2025, 9, 02);

    private static final int TOTAL_LOANS = 8;
    private static final int PAGE_SIZE = 5;

    private static final String GAME_TITLE_PARAM = "gameTitle";
    private static final String CLIENT_TITLE_PARAM = "clientName";
    private static final Date DATE_PARAM = new Date(2025, 1, 15);


    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    ParameterizedTypeReference<ResponsePage<LoanDto>> responseTypePage =
            new ParameterizedTypeReference<ResponsePage<LoanDto>>() {
            };

    @Test
    public void findFirstPageWithoutFiltersWithFiveSizeShouldReturnFirstFiveResults() {

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, PAGE_SIZE));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH,
                HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(TOTAL_LOANS, response.getBody().getTotalElements());
        assertEquals(PAGE_SIZE, response.getBody().getContent().size());
    }

    @Test
    public void findSecondPageWithoutFiltersWithFiveSizeShouldReturnLastResult() {

        int elementsCount = TOTAL_LOANS - PAGE_SIZE;

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(1, PAGE_SIZE));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH,
                HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(TOTAL_LOANS, response.getBody().getTotalElements());
        assertEquals(elementsCount, response.getBody().getContent().size());
    }


    @Test
    public void findExistsGameTitleShouldReturnLoans() {

        int LOANS_WITH_FILTER = 1;

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, PAGE_SIZE));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate
                .exchange(LOCALHOST + port + SERVICE_PATH + "?gameTitle=" + EXISTS_GAME_TITLE,
                        HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(LOANS_WITH_FILTER, response.getBody().getContent().size());
    }

    @Test
    public void findExistsClientNameShouldReturnLoans() {

        int LOANS_WITH_FILTER = 1;


        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, PAGE_SIZE));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate.
                exchange(LOCALHOST + port + SERVICE_PATH + "?clientName=" + EXISTS_CLIENT_NAME,
                        HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(LOANS_WITH_FILTER, response.getBody().getContent().size());
    }

    @Test
    public void findExistsDateShouldReturnGames() {

        int LOANS_WITH_FILTER = 2;

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, PAGE_SIZE));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate
                .exchange(LOCALHOST + port + SERVICE_PATH + "?date=" + EXISTS_DATE,
                        HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(LOANS_WITH_FILTER, response.getBody().getContent().size());
    }

    @Test
    public void findExistsLoanShouldReturnExistingLoan() {

        int LOANS_WITH_FILTER = 1;

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, PAGE_SIZE));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate.exchange(
                LOCALHOST + port + SERVICE_PATH + "?gameTitle=" + EXISTS_GAME_TITLE + "&clientName=" + EXISTS_CLIENT_NAME + "&date=" + EXISTS_DATE,
                HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(LOANS_WITH_FILTER, response.getBody().getContent().size());
    }

    @Test
    public void saveShouldCreateNewLoan() {

        long newLoanId = TOTAL_LOANS + 1;
        long newLoanSize = TOTAL_LOANS + 1;

        NEW_GAME.setTitle(NEW_GAME_TITLE);
        NEW_GAME.setId(2L);

        NEW_CLIENT.setName(NEW_CLIENT_NAME);
        NEW_CLIENT.setClientId(2L);

        LoanDto dto = new LoanDto();
        dto.setGame(NEW_GAME);
        dto.setClientName(NEW_CLIENT);
        dto.setStartDate(NEW_DATE);
        dto.setEndDate(NEW_END_DATE);

        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.PUT, new HttpEntity<>(dto), Void.class);

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, (int) newLoanSize));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH,
                HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);


        assertNotNull(response);
        assertEquals(newLoanSize, response.getBody().getTotalElements());

        LoanDto loan = response.getBody().getContent().stream().
                filter(item -> item.getId().equals(newLoanId)).findFirst().orElse(null);
        assertNotNull(loan);
        assertEquals(NEW_GAME_TITLE, loan.getGame().getTitle());
        assertEquals(NEW_CLIENT_NAME, loan.getClient().getName());
        assertEquals(NEW_DATE, loan.getStartDate());
        assertEquals(NEW_END_DATE, loan.getEndDate());
    }

    @Test
    public void saveBetweenLonedDatesShouldThrowException() {

        NEW_GAME.setTitle(NEW_GAME_TITLE);
        NEW_GAME.setId(2L);

        NEW_CLIENT.setName(NEW_CLIENT_NAME_2);
        NEW_CLIENT.setClientId(3L);

        LoanDto dto = new LoanDto();
        dto.setGame(NEW_GAME);
        dto.setClientName(NEW_CLIENT);
        dto.setStartDate(NEW_DATE);
        dto.setEndDate(NEW_END_DATE);

        ResponseEntity<?> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH,
                HttpMethod.PUT, new HttpEntity<>(dto), Void.class);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void clientSaves2GamesBetweenSameDatesShouldThrowException() {

        NEW_GAME.setTitle(NEW_GAME_TITLE);
        NEW_GAME.setId(2L);

        NEW_CLIENT.setName(NEW_CLIENT_NAME);
        NEW_CLIENT.setClientId(2L);

        LoanDto dto = new LoanDto();
        dto.setGame(NEW_GAME);
        dto.setClientName(NEW_CLIENT);
        dto.setStartDate(NEW_DATE);
        dto.setEndDate(NEW_END_DATE);

        LoanDto dto2 = new LoanDto();
        dto2.setGame(NEW_GAME);
        dto2.setClientName(NEW_CLIENT);
        dto2.setStartDate(NEW_DATE);
        dto2.setEndDate(NEW_END_DATE);

        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.PUT, new HttpEntity<>(dto), Void.class);

        ResponseEntity<?> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH,
                HttpMethod.PUT, new HttpEntity<>(dto2), Void.class);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void deleteWithExistsIdShouldDeleteLoan() {

        long newAuthorsSize = TOTAL_LOANS - 1;

        restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + DELETE_LOAN_ID,
                HttpMethod.DELETE, null, Void.class);

        LoanSearchDto searchDto = new LoanSearchDto();
        searchDto.setPageable(new PageableRequest(0, TOTAL_LOANS));

        ResponseEntity<ResponsePage<LoanDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH,
                HttpMethod.POST, new HttpEntity<>(searchDto), responseTypePage);

        assertNotNull(response);
        assertEquals(newAuthorsSize, response.getBody().getTotalElements());
    }

    @Test
    public void deleteWithNotExistsIdShouldThrowException() {

        long deleteLoanId = TOTAL_LOANS + 1;

        ResponseEntity<?> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + deleteLoanId,
                HttpMethod.DELETE, null, Void.class);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

}
