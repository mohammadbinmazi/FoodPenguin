package com.raftlabs.orderly.modelMapper;

import com.raftlabs.orderly.entity.Order;
import com.raftlabs.orderly.entity.OrderItem;
import com.raftlabs.orderly.model.order.response.OrderItemResponseDTO;
import com.raftlabs.orderly.model.order.response.OrderResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "id", target = "orderId")
    @Mapping(source = "orderItems", target = "items")
    OrderResponseDTO toResponseDto(Order order);

    @Mapping(source = "menuItem.id", target = "menuItemId")
    @Mapping(source = "menuItem.name", target = "name")
    OrderItemResponseDTO toItemResponseDto(OrderItem orderItem);

    List<OrderItemResponseDTO> toItemResponseDtoList(List<OrderItem> items);
}
