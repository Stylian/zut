package gr.manolis.zut.page;

import gr.manolis.zut.EntityMapper;
import gr.manolis.zut.page.component.ComponentMapper;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class PageMapper  implements EntityMapper<PageDTO, Page> {

//    @Autowired
//    ComponentMapper componentMapper;
//
//    @AfterMapping
//    void afterMappingEntity(@MappingTarget Page page, PageDTO pageDTO) {
//        page.setContent(componentMapper.toEntity(pageDTO.getContent()));
//    }
//    @AfterMapping
//    void afterMappingDTO(@MappingTarget PageDTO pageDTO, Page page) {
//        pageDTO.setContent(componentMapper.toDTO(page.getContent()));
//    }
}
