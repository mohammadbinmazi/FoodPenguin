package com.raftlabs.orderly.model.order.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequestDTO {

    @NotNull
    private Long menuItemId;

    @NotNull
    @Positive
    private Integer quantity;
}

