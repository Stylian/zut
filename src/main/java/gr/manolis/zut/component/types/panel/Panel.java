package gr.manolis.zut.component.types.panel;

import gr.manolis.zut.component.Component;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity(name = "PANELS")
@Data
public class Panel extends Component {

    @Column
    private String border;

    @Column
    private String backgroundColor = "rgb(255,255,255, 1)"; // transparent default

}
