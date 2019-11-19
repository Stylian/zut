package gr.manolis.zut.page;

import gr.manolis.zut.component.Component;
import lombok.Data;

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

    @OneToOne(mappedBy = "page", cascade = CascadeType.ALL)
    private Component content;

    public void setContent(Component content) {
        this.content = content;
        this.content.setPage(this);
    }

    @Column
    private int alive = 1;
}
