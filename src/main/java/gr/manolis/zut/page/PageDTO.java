package gr.manolis.zut.page;

import gr.manolis.zut.page.component.ComponentDTO;
import lombok.Data;

@Data
public class PageDTO {

    private int id;
    private String title;
    private String description;
    private int contentId;

}
