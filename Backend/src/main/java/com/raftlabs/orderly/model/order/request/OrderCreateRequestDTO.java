package com.raftlabs.orderly.model.order.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderCreateRequestDTO {

    @NotBlank
    private String customerName;

    @NotBlank
    private String deliveryAddress;

    @NotBlank
    private String phoneNumber;

    @NotEmpty
    private List<@Valid OrderItemRequestDTO> items;
}


