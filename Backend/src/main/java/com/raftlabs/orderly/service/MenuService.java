package com.raftlabs.orderly.service;

import com.raftlabs.orderly.entity.MenuItem;
import com.raftlabs.orderly.model.menu.request.MenuCreateRequestDTO;
import com.raftlabs.orderly.model.menu.response.MenuResponseDTO;
import com.raftlabs.orderly.model.menu.request.MenuUpdateRequestDTO;
import com.raftlabs.orderly.modelMapper.MenuMapper;
import com.raftlabs.orderly.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;
    private final MenuMapper menuMapper;

    private final  FileSystemStorageService  fileStorageService;

    public MenuResponseDTO createMenu(
            MenuCreateRequestDTO requestDTO

    ) {
        // Upload image
        String imageUrl = fileStorageService.uploadFile(requestDTO.getImage());


        // Map DTO → Entity
        MenuItem menuItem = menuMapper.toEntity(requestDTO);
        menuItem.setImageUrl(imageUrl);

        // Save to DB
        MenuItem savedMenu = menuRepository.save(menuItem);

        // Map Entity → Response
        return menuMapper.toResponseDto(savedMenu);
    }


    public List<MenuResponseDTO> getAllMenus() {
        return menuRepository.findAll()
                .stream()
                .map(menuMapper::toResponseDto)
                .toList();
    }

    public MenuResponseDTO getMenuById(Long id) {
        MenuItem menuItem = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        return menuMapper.toResponseDto(menuItem);
    }





}

