package com.ccsw.tutorial.client;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.client.model.ClientDto;

import java.util.List;

public interface ClientService {


    /**
     * Método para recuperar todas las categorías
     *
     * @return {@link List} de {@link ClientDto}
     */
    List<Client> findAll();

    /**
     * Método para crear o actualizar una categoría
     *
     * @param id  PK de la entidad
     * @param dto datos de la entidad
     */
    void save(Long id, ClientDto dto);

    /**
     * Método para borrar una categoría
     *
     * @param id PK de la entidad
     */
    void delete(Long id) throws Exception;
}
