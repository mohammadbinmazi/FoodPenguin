package com.raftlabs.orderly.model.order.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemResponseDTO {

    private Long menuItemId;
    private String name;
    private Integer quantity;
    private BigDecimal price;
}
