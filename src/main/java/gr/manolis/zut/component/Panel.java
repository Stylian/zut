package gr.manolis.zut.component;

import gr.manolis.zut.component.Component;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity(name = "PANELS")
@Data
public class Panel extends Component {

    @Column
    private String border;

    @Column
    private String backgroundColor = "rgb(255,255,255, 0)"; // transparent default

}
