package com.raftlabs.orderly.service;

import com.raftlabs.orderly.entity.MenuItem;
import com.raftlabs.orderly.entity.Order;
import com.raftlabs.orderly.enums.OrderStatus;
import com.raftlabs.orderly.model.order.request.OrderCreateRequestDTO;
import com.raftlabs.orderly.model.order.request.OrderItemRequestDTO;
import com.raftlabs.orderly.model.order.response.OrderResponseDTO;
import com.raftlabs.orderly.modelMapper.OrderMapper;
import com.raftlabs.orderly.repository.MenuRepository;
import com.raftlabs.orderly.repository.OrderRepository;
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
class OrderServiceTest {

    @InjectMocks
    private OrderService orderService;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private MenuRepository menuRepository;

    @Mock
    private OrderMapper orderMapper;

    private MenuItem menuItem;
    private Order order;

    @BeforeEach
    void setUp() {

        menuItem = new MenuItem();
        menuItem.setId(1L);
        menuItem.setName("Cheese Pizza");
        menuItem.setPrice(BigDecimal.valueOf(299));

        order = new Order();
        order.setId(1L);
        order.setStatus(OrderStatus.ORDER_RECEIVED);
        order.setTotalAmount(BigDecimal.valueOf(598));
    }

    @Test
    void placeOrder_ShouldCalculateTotalAndSave() {

        OrderItemRequestDTO itemRequest = new OrderItemRequestDTO();
        itemRequest.setMenuItemId(1L);
        itemRequest.setQuantity(2);

        OrderCreateRequestDTO requestDTO = new OrderCreateRequestDTO();
        requestDTO.setCustomerName("Sufiyan");
        requestDTO.setDeliveryAddress("Mumbai");
        requestDTO.setPhoneNumber("9999999999");
        requestDTO.setItems(List.of(itemRequest));

        Mockito.when(menuRepository.findById(1L))
                .thenReturn(Optional.of(menuItem));

        Mockito.when(orderRepository.save(Mockito.any(Order.class)))
                .thenReturn(order);

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderId(1L);
        responseDTO.setTotalAmount(BigDecimal.valueOf(598));

        Mockito.when(orderMapper.toResponseDto(Mockito.any(Order.class)))
                .thenReturn(responseDTO);

        OrderResponseDTO result =
                orderService.placeOrder(requestDTO);

        Assertions.assertEquals(BigDecimal.valueOf(598), result.getTotalAmount());

        Mockito.verify(orderRepository, Mockito.times(1))
                .save(Mockito.any(Order.class));
    }

    @Test
    void placeOrder_MenuNotFound_ShouldThrowException() {

        OrderItemRequestDTO itemRequest = new OrderItemRequestDTO();
        itemRequest.setMenuItemId(99L);
        itemRequest.setQuantity(1);

        OrderCreateRequestDTO requestDTO = new OrderCreateRequestDTO();
        requestDTO.setItems(List.of(itemRequest));

        Mockito.when(menuRepository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException ex = Assertions.assertThrows(
                RuntimeException.class,
                () -> orderService.placeOrder(requestDTO)
        );

        Assertions.assertEquals("Menu item not found", ex.getMessage());
    }

    @Test
    void getOrderById_ShouldReturnOrder() {

        Mockito.when(orderRepository.findById(1L))
                .thenReturn(Optional.of(order));

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderId(1L);

        Mockito.when(orderMapper.toResponseDto(order))
                .thenReturn(responseDTO);

        OrderResponseDTO result =
                orderService.getOrderById(1L);

        Assertions.assertEquals(1L, result.getOrderId());
    }

    @Test
    void getOrderById_NotFound_ShouldThrowException() {

        Mockito.when(orderRepository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException ex = Assertions.assertThrows(
                RuntimeException.class,
                () -> orderService.getOrderById(99L)
        );

        Assertions.assertEquals("Order not found", ex.getMessage());
    }


}

