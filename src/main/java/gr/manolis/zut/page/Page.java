package gr.manolis.zut.page;

import lombok.Data;

import javax.annotation.Generated;
import javax.persistence.*;

@Data
@Entity(name = "PAGES")
public class Page {

    @Id
    @GeneratedValue
    private int id;

    @Column
    private String title;

    @Column
    private String description;

}
