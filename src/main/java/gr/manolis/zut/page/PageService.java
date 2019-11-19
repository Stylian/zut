package gr.manolis.zut.page;

import gr.manolis.zut.page.component.Component;
import gr.manolis.zut.page.component.ComponentDTO;
import gr.manolis.zut.page.component.ComponentMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageService {

    Logger logger = Logger.getLogger(PageService.class);
    
    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private ComponentMapper componentMapper;

    @Autowired
    private PageRepository pageRepository;

    public PageDTO insert(PageDTO pageDTO) {
        logger.info("inserting new page...");

        Page page = pageMapper.toEntity(pageDTO);
        page.setContent(new Component());
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        return savedPageDTO;
    }

    public PageDTO edit(PageDTO pageDTO) {
        logger.info("editing page... " + pageDTO.getId());

        Page page = pageMapper.toEntity(pageDTO);
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        return savedPageDTO;
    }

    public ComponentDTO addComponent(int pageId, ComponentDTO componentDTO) {

        Page page = pageRepository.getOne(pageId);
        Component component = componentMapper.toEntity(componentDTO);
        component.setPage(page);
        component.setParent(page.getContent());

        int componentsNumber = page.getContent().getChildren().size();
        page.getContent().getChildren().add(component);

        Page savedPage = pageRepository.save(page);

        ComponentDTO savedComponentDTO = componentMapper.toDTO(savedPage.getContent()
                .getChildren().get(componentsNumber));

        return savedComponentDTO;
    }
}
