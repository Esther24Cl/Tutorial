package com.ccsw.tutorial.author.model;

/**
 * @author ccsw
 */

public class AuthorDto {
    private Long id;
    private String name;
    private String nationality;

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id new vale of {@link #getId()}
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name new vale of {@link #getName()}
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return nationality
     */
    public String getNationality() {
        return nationality;
    }

    /**
     * @param nationality new vale of {@link #getNationality()}
     */
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}
