package com.raftlabs.orderly.controller;

import com.raftlabs.orderly.model.menu.request.MenuCreateRequestDTO;
import com.raftlabs.orderly.model.menu.response.MenuResponseDTO;
import com.raftlabs.orderly.model.menu.request.MenuUpdateRequestDTO;
import com.raftlabs.orderly.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MenuResponseDTO> createMenu(
          @Valid @ModelAttribute MenuCreateRequestDTO requestDTO
    ) {
        MenuResponseDTO response = menuService.createMenu(requestDTO);
        return new  ResponseEntity<>(response,HttpStatus.CREATED);
    }


    // GET all menu items
    @GetMapping
    public ResponseEntity<List<MenuResponseDTO>> getAllMenus() {
        List<MenuResponseDTO> list = menuService.getAllMenus();
        return ResponseEntity.ok(list);
    }

    // GET menu item by id
    @GetMapping("/{id}")
    public ResponseEntity<MenuResponseDTO> getMenuById(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.getMenuById(id));
    }



}

