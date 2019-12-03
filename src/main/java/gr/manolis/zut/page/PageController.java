package gr.manolis.zut.page;

import gr.manolis.zut.component.Component;
import gr.manolis.zut.component.ComponentRepository;
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
    private PageRepository pageRepository;

    @Autowired
    private ComponentRepository componentRepository;

    // -------------------------------------------------- PAGES -----------------------------------------------------//
    @GetMapping("/")
    public ResponseEntity<List<Page>> getAllPages() {
        logger.info("getAllPages...");

        List<Page> pages = pageRepository.findAll();

        logger.info("getAllPages replies...");
        return new ResponseEntity<>(pages, HttpStatus.OK);
    }

    @GetMapping("/{page_id}")
    public ResponseEntity<Page> getPage(@PathVariable("page_id") int pageId) {
        logger.info("getPage...");

        Page page = pageRepository.findById(pageId);

        if (page == null) {
            logger.error("entity with the specified id does not exist in the database");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        logger.info("getPage replies...");
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @ResponseBody
    @PostMapping("/")
    public ResponseEntity<Page> insertPage(
            @RequestParam("title") @NotBlank String title,
            @RequestParam("description") String description
    ) {
        logger.info("insertPage...");

        Page page = new Page();
        page.setTitle(title);
        page.setDescription(description);

        page.setAlive(1);
        Page savedPage = pageRepository.save(page);

        logger.info("insertPage replies...");
        return new ResponseEntity<>(savedPage, HttpStatus.CREATED);
    }

    @ResponseBody
    @PutMapping("/{page_id}")
    public ResponseEntity<Page> editPage(
            @PathVariable("page_id") int pageId,
            @RequestParam("title") @NotBlank String title,
            @RequestParam("description") String description
    ) {
        logger.info("editPage...");

        // check if page exists in the database
        ResponseEntity<Page> responseEntity = getPage(pageId);
        Page page = responseEntity.getBody();
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(page, responseEntity.getStatusCode());
        }

        page.setTitle(title);
        page.setDescription(description);

        Page savedPage = pageRepository.save(page);

        logger.info("editPage replies...");
        return new ResponseEntity<>(savedPage, HttpStatus.CREATED);
    }

    @DeleteMapping("/{page_id}")
    public ResponseEntity<Integer> deletePage(@PathVariable("page_id") int pageId) {
        logger.info("deletePage...");

        // check if page exists in the database
        ResponseEntity<Page> responseEntity = getPage(pageId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(0, responseEntity.getStatusCode());
        }

        Page page = responseEntity.getBody();
        page.setAlive(0);
        pageRepository.save(page);

        logger.info("deletePage replies...");
        return new ResponseEntity<>(pageId, HttpStatus.OK);
    }

    // ----------------------------------------------- COMPONENTS --------------------------------------------------//

    @ResponseBody
    @PostMapping("/{page_id}/components")
    public ResponseEntity<Component> insertComponent(
            @PathVariable("page_id") int pageId,
            @RequestParam("top") @Min(0) int top,
            @RequestParam("left") @Min(0) int left,
            @RequestParam("height") @Min(0) int height,
            @RequestParam("width") @Min(0) int width
    ) {

        // check if page exists in the database
        ResponseEntity<Page> responseEntity = getPage(pageId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        }

        Page page = responseEntity.getBody();

        // this is the new component
        Component component = new Component();
        component.setLeft(left);
        component.setTop(top);
        component.setWidth(width);
        component.setHeight(height);

        Component savedComponent = componentService.addComponentToPage(page, component);
        return new ResponseEntity<>(savedComponent, HttpStatus.CREATED);
    }

    @GetMapping("/{page_id}/components")
    public ResponseEntity<List<Component>> getAllComponentsOfPage( @PathVariable("page_id") int pageId) {
        logger.info("getAllComponentsOfPage...");

        // check if page exists in the database
        ResponseEntity<Page> responseEntity = getPage(pageId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        }

        Page page = responseEntity.getBody();

        List<Component> components = componentRepository.findAllByPageId(page.getId());

        logger.info("getAllComponentsOfPage replies...");
        return new ResponseEntity<>(components, HttpStatus.OK);
    }

}
