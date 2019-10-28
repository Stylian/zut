package gr.manolis.zut.page;

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
        Page savedPage = pageRepository.save(page);
        PageDTO savedPageDTO = pageMapper.toDTO(savedPage);

        return savedPageDTO;
    }
}
