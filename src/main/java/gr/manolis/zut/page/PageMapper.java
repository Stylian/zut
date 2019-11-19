package gr.manolis.zut.page;

import gr.manolis.zut.EntityMapper;
import gr.manolis.zut.page.component.Component;
import gr.manolis.zut.page.component.ComponentMapper;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class PageMapper implements EntityMapper<PageDTO, Page> {

    @Mapping(target= "contentId", source="entity.content.id")
    @Mapping(target= "alive", expression="java(entity.getAlive() == 1)" )
    public abstract PageDTO toDTO(Page entity);

    @Mapping(target= "alive", expression="java(dto.isAlive() ? 1 : 0)" )
    public abstract Page toEntity(PageDTO dto);


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
