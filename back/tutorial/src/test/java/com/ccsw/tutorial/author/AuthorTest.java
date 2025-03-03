package com.ccsw.tutorial.author;

import com.ccsw.tutorial.author.model.Author;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthorTest {

    public static final Long EXITS_AUTHIR_ID = 1L;
    public static final Long NOT_EXITS_AUTHIR_ID = 0L;

    @Mock
    private AuthorRepository authorRepository;

    @InjectMocks
    private AuthorServiceImpl authorService;

    @Test
    public void getExistsAuthorIdShouldReturnAuthor() {

        Author author = mock(Author.class);
        when(author.getId()).thenReturn(EXITS_AUTHIR_ID);
        when(authorRepository.findById(EXITS_AUTHIR_ID)).thenReturn(Optional.of(author));

        Author authorResponse = authorService.get(NOT_EXITS_AUTHIR_ID);

        assertNotNull(authorResponse);
        assertEquals(NOT_EXITS_AUTHIR_ID, authorResponse.getId());
    }

    @Test
    public void getNotExistsAuthorIdShouldReturnAuthor() {
        when(authorRepository.findById(NOT_EXITS_AUTHIR_ID)).thenReturn(Optional.empty());

        Author author = authorService.get(NOT_EXITS_AUTHIR_ID);
        assertNull(author);
    }

}
