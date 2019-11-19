package gr.manolis.zut.component;

import gr.manolis.zut.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ComponentMapper extends EntityMapper<ComponentDTO, Component> {

}
