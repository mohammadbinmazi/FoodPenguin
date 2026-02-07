package com.raftlabs.orderly.service;

import com.raftlabs.orderly.entity.Order;
import com.raftlabs.orderly.enums.OrderStatus;
import com.raftlabs.orderly.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@RequiredArgsConstructor
public class OrderStatusScheduler {

    private final OrderRepository orderRepository;

    @Scheduled(fixedDelay = 30000)
    public void updateOrderStatuses() {

        List<Order> orders = orderRepository.findAll();

        for (Order order : orders) {
            OrderStatus nextStatus = getNextStatus(order.getStatus());

            if (nextStatus != null) {
                order.setStatus(nextStatus);
                orderRepository.save(order);
            }
        }
    }

    private OrderStatus getNextStatus(OrderStatus currentStatus) {

        return switch (currentStatus) {
            case ORDER_RECEIVED -> OrderStatus.PREPARING;
            case PREPARING -> OrderStatus.OUT_FOR_DELIVERY;
            case OUT_FOR_DELIVERY -> OrderStatus.DELIVERED;
            default -> null;
        };
    }
}
