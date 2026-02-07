package com.raftlabs.orderly.controller;

import com.raftlabs.orderly.entity.Order;
import com.raftlabs.orderly.enums.OrderStatus;
import com.raftlabs.orderly.repository.OrderRepository;
import com.raftlabs.orderly.service.OrderStatusScheduler;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class OrderStatusSchedulerTest {

    @InjectMocks
    private OrderStatusScheduler scheduler;

    @Mock
    private OrderRepository orderRepository;

    @Test
    void scheduler_ShouldMoveOrderOneStepForward() {

        Order order = new Order();
        order.setId(1L);
        order.setStatus(OrderStatus.ORDER_RECEIVED);

        Mockito.when(orderRepository.findAll())
                .thenReturn(List.of(order));

        scheduler.updateOrderStatuses();

        Assertions.assertEquals(OrderStatus.PREPARING, order.getStatus());
        Mockito.verify(orderRepository).save(order);
    }

    @Test
    void scheduler_ShouldNotChangeDeliveredOrder() {

        Order order = new Order();
        order.setId(1L);
        order.setStatus(OrderStatus.DELIVERED);

        Mockito.when(orderRepository.findAll())
                .thenReturn(List.of(order));

        scheduler.updateOrderStatuses();

        Assertions.assertEquals(OrderStatus.DELIVERED, order.getStatus());
        Mockito.verify(orderRepository, Mockito.never()).save(order);
    }
}
