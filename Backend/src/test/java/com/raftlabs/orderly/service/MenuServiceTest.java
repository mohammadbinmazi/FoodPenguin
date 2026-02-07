package com.raftlabs.orderly.service;

import com.raftlabs.orderly.entity.MenuItem;
import com.raftlabs.orderly.model.menu.request.MenuCreateRequestDTO;
import com.raftlabs.orderly.model.menu.response.MenuResponseDTO;
import com.raftlabs.orderly.modelMapper.MenuMapper;
import com.raftlabs.orderly.repository.MenuRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class MenuServiceTest {

    @InjectMocks
    private MenuService menuService;

    @Mock
    private MenuRepository menuRepository;

    @Mock
    private MenuMapper menuMapper;



    private MenuItem menuItem;
    private MenuCreateRequestDTO createRequest;
    private MenuResponseDTO responseDTO;

    @BeforeEach
    void setUp() {

        createRequest = new MenuCreateRequestDTO();
        createRequest.setName("Cheese Pizza");
        createRequest.setCategory("pizza");
        createRequest.setDescription("Classic");
        createRequest.setPrice(BigDecimal.valueOf(299));

        menuItem = new MenuItem();
        menuItem.setId(1L);
        menuItem.setName("Cheese Pizza");
        menuItem.setPrice(BigDecimal.valueOf(299));

        responseDTO = new MenuResponseDTO();
        responseDTO.setId(1L);
        responseDTO.setName("Cheese Pizza");
        responseDTO.setPrice(BigDecimal.valueOf(299));
    }

    @Test
    void createMenu_ShouldSaveMenuSuccessfully() {

        Mockito.when(menuMapper.toEntity(createRequest))
                .thenReturn(menuItem);

        Mockito.when(menuRepository.save(menuItem))
                .thenReturn(menuItem);

        Mockito.when(menuMapper.toResponseDto(menuItem))
                .thenReturn(responseDTO);

        MenuResponseDTO result =
                menuService.createMenu(createRequest);

        Assertions.assertNotNull(result);
        Assertions.assertEquals("Cheese Pizza", result.getName());

        Mockito.verify(menuRepository, Mockito.times(1))
                .save(menuItem);
    }

    @Test
    void getAllMenus_ShouldReturnMappedList() {

        Mockito.when(menuRepository.findAll())
                .thenReturn(List.of(menuItem));

        Mockito.when(menuMapper.toResponseDto(menuItem))
                .thenReturn(responseDTO);

        List<MenuResponseDTO> result =
                menuService.getAllMenus();

        Assertions.assertEquals(1, result.size());

        Mockito.verify(menuRepository).findAll();
        Mockito.verify(menuMapper).toResponseDto(menuItem);
    }

    @Test
    void getMenuById_ShouldReturnMenu() {

        Mockito.when(menuRepository.findById(1L))
                .thenReturn(Optional.of(menuItem));

        Mockito.when(menuMapper.toResponseDto(menuItem))
                .thenReturn(responseDTO);

        MenuResponseDTO result =
                menuService.getMenuById(1L);

        Assertions.assertEquals("Cheese Pizza", result.getName());
    }

    @Test
    void getMenuById_NotFound_ShouldThrowException() {

        Mockito.when(menuRepository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException ex = Assertions.assertThrows(
                RuntimeException.class,
                () -> menuService.getMenuById(99L)
        );

        Assertions.assertEquals("Menu item not found", ex.getMessage());
    }


}
