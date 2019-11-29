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

    public Component addComponentToPage(Page page, Component component) {

        component.setPage(page);

        int componentsNumber = page.getComponents().size();
        page.getComponents().add(component);

        Page savedPage = pageRepository.save(page);

        Component savedComponent = savedPage.getComponents().get(componentsNumber);

        return savedComponent;
    }

}
