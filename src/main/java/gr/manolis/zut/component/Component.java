package gr.manolis.zut.component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import gr.manolis.zut.page.Page;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Panel.class, name = "panel"),
})
@Data
@Entity(name = "COMPONENTS")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Component {

    @Id
    @GeneratedValue
    private int id;

    // location in parent
    @Column(name = "topLoc")
    private int top;

    @Column(name = "leftLoc")
    private int left;

    // dimensions
    @Column
    private int height;

    @Column
    private int width;

    @ToString.Exclude
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Component> children = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private Component parent;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id")
    private Page page;

    public Component() { }

}
