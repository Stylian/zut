package gr.manolis.zut.component;

import gr.manolis.zut.page.Page;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;

@RestController
@RequestMapping("/components")
public class ComponentController {

    Logger logger = Logger.getLogger(ComponentController.class);

    @Autowired
    private ComponentRepository componentRepository;

    @Autowired
    private ComponentService componentService;

    @GetMapping("/")
    public ResponseEntity<List<Component>> getAllControllers() {
        logger.info("getAllControllers...");

        List<Component> components = componentRepository.findAll();

        logger.info("getAllControllers replies...");
        return new ResponseEntity<>(components, HttpStatus.OK);
    }

    @GetMapping("/{component_id}")
    public ResponseEntity<Component> getComponent(@PathVariable("component_id") int componentId) {
        logger.info("getComponent...");

        Component component = componentRepository.findById(componentId);

        if (component == null) {
            logger.error("entity with the specified id does not exist in the database");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        logger.info("getComponent replies...");
        return new ResponseEntity<>(component, HttpStatus.OK);
    }


    @ResponseBody
    @PutMapping("/{component_id}")
    public ResponseEntity<Component> editComponent(
            @PathVariable("component_id") int componentId,
            @RequestParam("top") @Min(0) int top,
            @RequestParam("left") @Min(0) int left,
            @RequestParam("height") @Min(0) int height,
            @RequestParam("width") @Min(0) int width
    ) {
        logger.info("editComponent...");

        // check if Component exists in the database
        ResponseEntity<Component> responseEntity = getComponent(componentId);
        Component component = responseEntity.getBody();
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(component, responseEntity.getStatusCode());
        }

        component.setTop(top);
        component.setLeft(left);
        component.setHeight(height);
        component.setWidth(width);

        Component savedComponent = componentRepository.save(component);

        logger.info("editComponent replies...");
        return new ResponseEntity<>(savedComponent, HttpStatus.CREATED);
    }

    @DeleteMapping("/{component_id}")
    public ResponseEntity<Integer> deleteComponent(@PathVariable("component_id") int componentId) {
        logger.info("deleteComponent...");

        // check if component exists in the database
        ResponseEntity<Component> responseEntity = getComponent(componentId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(0, responseEntity.getStatusCode());
        }

        Component component = responseEntity.getBody();
        componentRepository.delete(component);

        logger.info("deleteComponent replies...");
        return new ResponseEntity<>(componentId, HttpStatus.OK);
    }


    @ResponseBody
    @PostMapping(value="/{component_id}/children")
    public ResponseEntity<Component> insertComponent(
            @PathVariable("component_id") int parentId,
            @RequestBody Component component
    ) {

        // check if page exists in the database
        ResponseEntity<Component> responseEntity = getComponent(parentId);
        if (!HttpStatus.OK.equals(responseEntity.getStatusCode())) {
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        }

        Component parent = responseEntity.getBody();

        Component savedComponent = componentService.addComponentToComponent(parent, component);
        return new ResponseEntity<>(savedComponent, HttpStatus.CREATED);
    }

}
