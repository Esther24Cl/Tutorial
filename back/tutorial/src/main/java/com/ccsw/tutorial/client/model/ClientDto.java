package com.ccsw.tutorial.client.model;

public class ClientDto {
    private Long id;
    private String name;

    /**
     * @return id
     */
    public Long getid() {
        return id;
    }

    /**
     * @param id new value of {@link #getid}.
     */
    public void setid(Long id) {
        this.id = id;
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
