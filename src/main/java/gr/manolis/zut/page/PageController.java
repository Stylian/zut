package gr.manolis.zut.page;

import gr.manolis.zut.component.ComponentDTO;
import gr.manolis.zut.component.ComponentService;
import org.apache.log4j.Logger;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.Min;
import java.util.List;

@RestController
@RequestMapping("/pages")
public class PageController {

    Logger logger = Logger.getLogger(PageController.class);

    @Autowired
    private PageService pageService;

    @Autowired
    private ComponentService componentService;

    @Autowired
    private PageMapper pageMapper;

    @Autowired
    private PageRepository pageRepository;

    // -------------------------------------------------- PAGES -----------------------------------------------------//
    @GetMapping("/")
    public ResponseEntity<List<PageDTO>> getAllPages() {
        logger.info("getAllPages...");

        List<Page> pages = pageRepository.findAll();
        List<PageDTO> pagesDTO = pageMapper.toDTO(pages);

        logger.info("getAllPages replies...");
        return new ResponseEntity<>(pagesDTO, HttpStatus.OK);
    }

    @GetMapping("/{page_id}")
    public ResponseEntity<PageDTO> getPage(@PathVariable("page_id") int pageId) {
        logger.info("getPage...");

        if (pageId == 0) {
            logger.error("page_id parameter is not a number");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        try {
            Page page = pageRepository.getOne(pageId);
            PageDTO pageDTO = pageMapper.toDTO(page);

            logger.info("getPage replies...");
            return new ResponseEntity<>(pageDTO, HttpStatus.OK);

        } catch (EntityNotFoundException e) {
            logger.error("entity with the specified id does not exist in the database");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ResponseBody
    @PostMapping("/")
    public ResponseEntity<PageDTO> insertPage(
            @RequestParam("title") @NotBlank String title,
            @RequestParam("description") String description
    ) {
        logger.info("insertPage...");

        PageDTO pageDTO = new PageDTO();
        pageDTO.setTitle(title);
        pageDTO.setDescription(description);

        PageDTO savedPageDTO = pageService.insert(pageDTO);

        logger.info("insertPage replies...");
        return new ResponseEntity<>(savedPageDTO, HttpStatus.CREATED);
    }

    @ResponseBody
    @PutMapping("/{page_id}")
    public ResponseEntity<PageDTO> editPage(
            @PathVariable("page_id") int pageId,
            @RequestParam("title") @NotBlank String title,
            @RequestParam("description") String description
    ) {
        logger.info("editPage...");

        // check if page exists in the database
        ResponseEntity<PageDTO> responseEntity = getPage(pageId);
        PageDTO pageDTO = responseEntity.getBody();
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(pageDTO, responseEntity.getStatusCode());
        }

        pageDTO.setTitle(title);
        pageDTO.setDescription(description);

        PageDTO savedPageDTO = pageService.edit(pageDTO);

        logger.info("editPage replies...");
        return new ResponseEntity<>(savedPageDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{page_id}")
    public ResponseEntity<Integer> deletePage(@PathVariable("page_id") int pageId) {
        logger.info("deletePage...");

        // check if page exists in the database
        ResponseEntity<PageDTO> responseEntity = getPage(pageId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(0, responseEntity.getStatusCode());
        }

        pageService.delete(responseEntity.getBody());

        logger.info("deletePage replies...");
        return new ResponseEntity<>(pageId, HttpStatus.OK);
    }

    // ----------------------------------------------- COMPONENTS --------------------------------------------------//

    @ResponseBody
    @PostMapping("/{page_id}/components")
    public ResponseEntity<ComponentDTO> insertComponent(
            @PathVariable("page_id") int pageId,
            @RequestParam("top") @Min(0) int top,
            @RequestParam("left") @Min(0) int left,
            @RequestParam("height") @Min(0) int height,
            @RequestParam("width") @Min(0) int width
    ) {

        // check if page exists in the database
        ResponseEntity<PageDTO> responseEntity = getPage(pageId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        }

        PageDTO pageDTO = responseEntity.getBody();

        // this is the new component
        ComponentDTO componentDTO = new ComponentDTO();
        componentDTO.setLeft(left);
        componentDTO.setTop(top);
        componentDTO.setWidth(width);
        componentDTO.setHeight(height);

        ComponentDTO savedComponentDTO = componentService.addComponent(pageDTO.getId(), componentDTO);
        return new ResponseEntity<>(savedComponentDTO, HttpStatus.CREATED);
    }


}
