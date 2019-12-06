package gr.manolis.zut.component;

import gr.manolis.zut.page.Page;
import gr.manolis.zut.page.PageRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComponentService {

    Logger logger = Logger.getLogger(ComponentService.class);

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private ComponentRepository componentRepository;

    public Component addComponentToPage(Page page, Component component) {

        component.setPage(page);

        int componentsNumber = page.getComponents().size();
        page.getComponents().add(component);

        Page savedPage = pageRepository.save(page);
        Component savedComponent = savedPage.getComponents().get(componentsNumber);

        return savedComponent;
    }

    public Component addComponentToComponent(Component parent, Component component) {

        component.setParent(parent);

        int componentsNumber = parent.getChildren().size();
        parent.getChildren().add(component);

        Component savedParent = componentRepository.save(parent);
        Component savedComponent = savedParent.getChildren().get(componentsNumber);

        return savedComponent;
    }

}
