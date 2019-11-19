package gr.manolis.zut.page;

import gr.manolis.zut.page.component.Component;
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

    @OneToOne(fetch=FetchType.EAGER, mappedBy = "parent", orphanRemoval = true, cascade = CascadeType.ALL)
    private Component content;

    public void setContent(Component content) {
        this.content = content;
        this.content.setPage(this);
    }

    @Column
    private int alive = 1;
}
