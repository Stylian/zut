package gr.manolis.zut.page;

import gr.manolis.zut.component.Component;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageService {

    Logger logger = Logger.getLogger(PageService.class);
    
    @Autowired
    private PageRepository pageRepository;

}
