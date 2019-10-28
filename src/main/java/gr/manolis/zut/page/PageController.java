package gr.manolis.zut.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pages")
public class PageController {

    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private PageRepository pageRepository;

    @RequestMapping("/")
    public Object test() {

        PageDTO pageDTO = new PageDTO();
        pageDTO.setDescription("a d esreficvdsfjsd");
        pageDTO.setTitle("The Fund");

        Page page = pageMapper.toEntity(pageDTO);

        Page savedPage = pageRepository.save(page);

        PageDTO pageDTO2 = pageMapper.toDTO(savedPage);

        return pageDTO2;
    }

}
