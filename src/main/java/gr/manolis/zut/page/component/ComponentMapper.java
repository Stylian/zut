package gr.manolis.zut.page.component;

import gr.manolis.zut.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ComponentMapper extends EntityMapper<ComponentDTO, Component> {
}
