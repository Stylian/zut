package gr.manolis.zut.component;

import gr.manolis.zut.page.PageService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/components")
public class ComponentController {

    Logger logger = Logger.getLogger(ComponentController.class);

    @Autowired
    private ComponentRepository componentRepository;


    @GetMapping("/{component_id}")
    public ResponseEntity<Component> getComponent(@PathVariable("component_id") int componentId) {
        logger.info("getComponent...");

        if (componentId == 0) {
            logger.error("component_id parameter is not a number");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        try {
            Component component = componentRepository.getOne(componentId);

            logger.info("getComponent replies...");
            return new ResponseEntity<>(component, HttpStatus.OK);

        } catch (EntityNotFoundException e) {
            logger.error("entity with the specified id does not exist in the database");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


}
