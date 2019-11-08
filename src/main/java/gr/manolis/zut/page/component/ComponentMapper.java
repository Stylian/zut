package gr.manolis.zut.page.component;

import gr.manolis.zut.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComponentMapper extends EntityMapper<ComponentDTO, Component> {

}
