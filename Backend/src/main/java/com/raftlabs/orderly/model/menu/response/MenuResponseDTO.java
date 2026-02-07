package com.raftlabs.orderly.model.menu.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class MenuResponseDTO {

    private Long id;

    private String name;

    private String category;

    private String description;

    private BigDecimal price;

    private String imageUrl;


}
