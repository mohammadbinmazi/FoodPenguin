package com.raftlabs.orderly.service;

import com.raftlabs.orderly.entity.MenuItem;
import com.raftlabs.orderly.entity.Order;
import com.raftlabs.orderly.entity.OrderItem;
import com.raftlabs.orderly.enums.OrderStatus;
import com.raftlabs.orderly.model.order.request.OrderCreateRequestDTO;
import com.raftlabs.orderly.model.order.request.OrderItemRequestDTO;
import com.raftlabs.orderly.model.order.response.OrderResponseDTO;
import com.raftlabs.orderly.modelMapper.OrderMapper;
import com.raftlabs.orderly.repository.MenuRepository;
import com.raftlabs.orderly.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuRepository menuRepository;
    private final OrderMapper orderMapper;

    public OrderResponseDTO placeOrder(OrderCreateRequestDTO requestDTO) {

        Order order = new Order();
        order.setCustomerName(requestDTO.getCustomerName());
        order.setDeliveryAddress(requestDTO.getDeliveryAddress());
        order.setPhoneNumber(requestDTO.getPhoneNumber());
        order.setStatus(OrderStatus.ORDER_RECEIVED);
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDTO : requestDTO.getItems()) {

            MenuItem menuItem = menuRepository.findById(itemDTO.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            BigDecimal itemTotal =
                    menuItem.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity()));

            totalAmount = totalAmount.add(itemTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(menuItem.getPrice());

            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // 👇 MapStruct used HERE (perfect place)
        return orderMapper.toResponseDto(savedOrder);
    }



    public OrderResponseDTO getOrderById(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return orderMapper.toResponseDto(order);
    }
}
