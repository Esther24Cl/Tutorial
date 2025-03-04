package com.ccsw.tutorial.client.model;

import jakarta.persistence.*;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long clientId;

    @Column(name = "name", nullable = false)
    private String name;

    /**
     * @return clientId
     */
    public Long getClientId() {
        return clientId;
    }

    /**
     * @param clientId new value of {@link #getClientId}.
     */
    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name new value of {@link #getName}.
     */
    public void setName(String name) {
        this.name = name;
    }
}
