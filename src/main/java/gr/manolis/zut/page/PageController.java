package gr.manolis.zut.page;

import gr.manolis.zut.page.component.ComponentDTO;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages")
public class PageController {

    @Autowired
    private PageService pageService;

    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private PageRepository pageRepository;

    // -------------------------------------------------- PAGES -----------------------------------------------------//
    @GetMapping("/")
    public List<PageDTO> getAllPages() {

        List<Page> pages = pageRepository.findAll();
        List<PageDTO> pagesDTO = pageMapper.toDTO(pages);

        return pagesDTO;
    }

    @GetMapping("/{page_id}")
    public PageDTO getPage(@PathVariable("page_id") String strPageId) {

        int pageId = NumberUtils.toInt(strPageId);
        Page page = pageRepository.getOne(pageId);
        PageDTO pageDTO = pageMapper.toDTO(page);

        return pageDTO;
    }

    @ResponseBody
    @PostMapping("/")
    public PageDTO insertPage(
            @RequestParam("title") String title,
            @RequestParam("description") String description
    ) {

        PageDTO pageDTO = new PageDTO();
        if(StringUtils.isBlank(title)) {
            pageDTO.setId(-1);
            return pageDTO;
        }

        pageDTO.setTitle(title);
        pageDTO.setDescription(description);

        PageDTO savedPageDTO = pageService.insert(pageDTO);

        return savedPageDTO;
    }

    @DeleteMapping("/{page_id}")
    public int deletePage(@PathVariable("page_id") String strPageId) {

        int pageId = NumberUtils.toInt(strPageId);
        pageRepository.delete(pageId);

        return 1;
    }

    // ----------------------------------------------- COMPONENTS --------------------------------------------------//

    @ResponseBody
    @PostMapping("/{page_id}/components")
    public PageDTO insertComponent(
            @PathVariable("page_id") String strPageId,
            @RequestParam("top") int top,
            @RequestParam("left") int left,
            @RequestParam("height") int height,
            @RequestParam("width") int width
    ) {

        PageDTO pageDTO = getPage(strPageId);

        // this is the new component
        ComponentDTO componentDTO = new ComponentDTO();
        componentDTO.setLeft(left);
        componentDTO.setTop(top);
        componentDTO.setWidth(width);
        componentDTO.setHeight(height);
        componentDTO.setPage(pageDTO);
        componentDTO.setParent(pageDTO.getContent());

        pageDTO.getContent().getChildren().add(componentDTO);

        PageDTO savedPageDTO = pageService.save(pageDTO);

        return savedPageDTO;
    }



}
