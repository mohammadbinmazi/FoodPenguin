package com.raftlabs.orderly.controller;

import com.raftlabs.orderly.enums.OrderStatus;
import com.raftlabs.orderly.model.order.request.OrderCreateRequestDTO;
import com.raftlabs.orderly.model.order.request.OrderItemRequestDTO;
import com.raftlabs.orderly.model.order.response.OrderResponseDTO;
import com.raftlabs.orderly.service.OrderService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {

    @InjectMocks
    private OrderController orderController;

    @Mock
    private OrderService orderService;

    @Test
    void placeOrder_ShouldReturnCreated() {

        OrderCreateRequestDTO requestDTO = new OrderCreateRequestDTO();
        requestDTO.setCustomerName("Sufiyan");
        requestDTO.setDeliveryAddress("Mumbai");
        requestDTO.setPhoneNumber("9999999999");

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(1L);
        item.setQuantity(2);

        requestDTO.setItems(List.of(item));

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderId(1L);
        responseDTO.setStatus(OrderStatus.ORDER_RECEIVED);
        responseDTO.setTotalAmount(BigDecimal.valueOf(598));

        Mockito.when(orderService.placeOrder(requestDTO))
                .thenReturn(responseDTO);

        ResponseEntity<OrderResponseDTO> response =
                orderController.placeOrder(requestDTO);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
        Assertions.assertEquals(1L, response.getBody().getOrderId());

        Mockito.verify(orderService, Mockito.times(1))
                .placeOrder(requestDTO);
    }

    @Test
    void getOrderById_ShouldReturnOrder() {

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderId(1L);
        responseDTO.setStatus(OrderStatus.PREPARING);

        Mockito.when(orderService.getOrderById(1L))
                .thenReturn(responseDTO);

        ResponseEntity<OrderResponseDTO> response =
                orderController.getOrderById(1L);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(OrderStatus.PREPARING, response.getBody().getStatus());
    }


}

