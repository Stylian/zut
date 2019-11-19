package gr.manolis.zut.component;

import lombok.Data;

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
