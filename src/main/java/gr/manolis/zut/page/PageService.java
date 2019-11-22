package gr.manolis.zut.page;

import gr.manolis.zut.component.Component;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageService {

    Logger logger = Logger.getLogger(PageService.class);
    
    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private PageRepository pageRepository;

    public PageDTO insert(PageDTO pageDTO) {
        logger.info("inserting new page...");

        Page page = pageMapper.toEntity(pageDTO);
        page.setContent(new Component());
        page.setAlive(1);
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        logger.info("done with insertion");
        return savedPageDTO;
    }

    public PageDTO edit(PageDTO pageDTO) {
        logger.info("editing page... " + pageDTO.getId());

        Page page = pageMapper.toEntity(pageDTO);
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        logger.info("done with edit");
        return savedPageDTO;
    }

    public void delete(PageDTO pageDTO) {
        logger.info("deleting page... " + pageDTO.getId());

        Page page = pageMapper.toEntity(pageDTO);
        page.setAlive(0);
        pageRepository.save(page);

        logger.info("done with delete");
    }
}
