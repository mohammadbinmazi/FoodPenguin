package com.raftlabs.orderly.model.order.response;

import com.raftlabs.orderly.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OrderResponseDTO {

    private Long orderId;
    private OrderStatus status;
    private BigDecimal totalAmount;

    private List<OrderItemResponseDTO> items;
}
