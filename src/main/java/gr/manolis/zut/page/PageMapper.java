package gr.manolis.zut.page;

import gr.manolis.zut.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PageMapper  extends EntityMapper<PageDTO, Page> {
}
