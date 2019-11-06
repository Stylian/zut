package gr.manolis.zut.page;

import gr.manolis.zut.page.component.Component;
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
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        return savedPageDTO;
    }

    public PageDTO save(PageDTO pageDTO) {
        logger.info("saving page...");

        Page page = pageMapper.toEntity(pageDTO);
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        return savedPageDTO;
    }
}
