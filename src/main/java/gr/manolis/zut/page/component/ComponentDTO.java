package gr.manolis.zut.page.component;

import gr.manolis.zut.page.PageDTO;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
public class ComponentDTO {

    private int id;
    private int top;
    private int left;
    private int height;
    private int width;

    private List<Integer> childrenIds = new ArrayList<>();
    private int parentId;
    private int pageId;
}