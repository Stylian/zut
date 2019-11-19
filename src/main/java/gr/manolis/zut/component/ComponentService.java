package gr.manolis.zut.component;

import gr.manolis.zut.page.Page;
import gr.manolis.zut.page.PageMapper;
import gr.manolis.zut.page.PageRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComponentService {

    Logger logger = Logger.getLogger(ComponentService.class);

    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private ComponentMapper componentMapper;

    @Autowired
    private PageRepository pageRepository;

    public ComponentDTO addComponent(int pageId, ComponentDTO componentDTO) {

        Page page = pageRepository.getOne(pageId);
        Component component = componentMapper.toEntity(componentDTO);
        component.setParent(page.getContent());

        int componentsNumber = page.getContent().getChildren().size();
        page.getContent().getChildren().add(component);

        Page savedPage = pageRepository.save(page);

        ComponentDTO savedComponentDTO = componentMapper.toDTO(savedPage.getContent()
                .getChildren().get(componentsNumber));

        return savedComponentDTO;
    }

}
