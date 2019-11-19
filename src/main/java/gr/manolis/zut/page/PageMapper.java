package gr.manolis.zut.page;

import gr.manolis.zut.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class PageMapper implements EntityMapper<PageDTO, Page> {

    @Mapping(target= "contentId", source="entity.content.id")
    @Mapping(target= "alive", expression="java(entity.getAlive() == 1)" )
    public abstract PageDTO toDTO(Page entity);

    @Mapping(target= "alive", expression="java(dto.isAlive() ? 1 : 0)" )
    public abstract Page toEntity(PageDTO dto);
}
