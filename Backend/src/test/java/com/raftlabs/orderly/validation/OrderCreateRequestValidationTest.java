package com.raftlabs.orderly.validation;

import com.raftlabs.orderly.model.order.request.OrderCreateRequestDTO;
import com.raftlabs.orderly.model.order.request.OrderItemRequestDTO;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

class OrderCreateRequestValidationTest extends ValidationTestBase {

    @Test
    void placeOrder_ShouldFail_WhenCustomerNameIsBlank() {

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("");
        dto.setDeliveryAddress("Mumbai");
        dto.setPhoneNumber("9999999999");

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(1L);
        item.setQuantity(1);

        dto.setItems(List.of(item));

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertFalse(violations.isEmpty());
    }



    @Test
    void placeOrder_ShouldFail_WhenDeliveryAddressIsBlank() {

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("Sufiyan");
        dto.setDeliveryAddress("");
        dto.setPhoneNumber("9999999999");

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(1L);
        item.setQuantity(1);

        dto.setItems(List.of(item));

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertFalse(violations.isEmpty());
    }


    @Test
    void placeOrder_ShouldFail_WhenPhoneNumberIsBlank() {

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("Sufiyan");
        dto.setDeliveryAddress("Mumbai");
        dto.setPhoneNumber("");

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(1L);
        item.setQuantity(1);

        dto.setItems(List.of(item));

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertFalse(violations.isEmpty());
    }


    @Test
    void placeOrder_ShouldFail_WhenItemsListIsEmpty() {

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("Sufiyan");
        dto.setDeliveryAddress("Mumbai");
        dto.setPhoneNumber("9999999999");
        dto.setItems(List.of());

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertFalse(violations.isEmpty());
    }


    @Test
    void placeOrder_ShouldFail_WhenQuantityIsZero() {

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(1L);
        item.setQuantity(0);

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("Sufiyan");
        dto.setDeliveryAddress("Mumbai");
        dto.setPhoneNumber("9999999999");
        dto.setItems(List.of(item));

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertFalse(violations.isEmpty());
    }


    @Test
    void placeOrder_ShouldFail_WhenMenuItemIdIsNull() {

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(null);
        item.setQuantity(1);

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("Sufiyan");
        dto.setDeliveryAddress("Mumbai");
        dto.setPhoneNumber("9999999999");
        dto.setItems(List.of(item));

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertFalse(violations.isEmpty());
    }


    @Test
    void placeOrder_ShouldPass_WhenInputIsValid() {

        OrderItemRequestDTO item = new OrderItemRequestDTO();
        item.setMenuItemId(1L);
        item.setQuantity(2);

        OrderCreateRequestDTO dto = new OrderCreateRequestDTO();
        dto.setCustomerName("Sufiyan");
        dto.setDeliveryAddress("Mumbai");
        dto.setPhoneNumber("9999999999");
        dto.setItems(List.of(item));

        Set<ConstraintViolation<OrderCreateRequestDTO>> violations =
                validator.validate(dto);

        Assertions.assertTrue(violations.isEmpty());
    }

}
