package gr.manolis.zut.component;

import gr.manolis.zut.EntityMapper;
import gr.manolis.zut.page.Page;
import gr.manolis.zut.page.PageDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class ComponentMapper implements EntityMapper<ComponentDTO, Component> {

    @Mapping(target= "pageId", source="entity.page.id")
    public abstract ComponentDTO toDTO(Component entity);

    public abstract Component toEntity(ComponentDTO dto);
}
