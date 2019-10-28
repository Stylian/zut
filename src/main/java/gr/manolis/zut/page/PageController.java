package gr.manolis.zut.page;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
//@Transactional
@RequestMapping("/pages")
public class PageController {

    @RequestMapping("/")
    public int test() {
        return 5;
    }

}
