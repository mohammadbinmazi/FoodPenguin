package com.raftlabs.orderly.modelMapper;

import com.raftlabs.orderly.entity.MenuItem;
import com.raftlabs.orderly.model.menu.request.MenuCreateRequestDTO;
import com.raftlabs.orderly.model.menu.response.MenuResponseDTO;
import com.raftlabs.orderly.model.menu.request.MenuUpdateRequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MenuMapper {

    // POST: Create MenuItem from request
    MenuItem toEntity(MenuCreateRequestDTO dto);

    // PUT: Update existing MenuItem
    void updateEntityFromDto(
            MenuUpdateRequestDTO dto,
            @MappingTarget MenuItem menuItem
    );

    // RESPONSE: Entity → Response DTO
    MenuResponseDTO toResponseDto(MenuItem menuItem);
}
