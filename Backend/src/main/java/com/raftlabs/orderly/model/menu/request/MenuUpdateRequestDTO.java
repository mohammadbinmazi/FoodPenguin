package com.raftlabs.orderly.model.menu.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Setter
@Getter
public class MenuUpdateRequestDTO {

    private  String name;

    private String category;

    private  String description;

    private BigDecimal price;

    private MultipartFile image;

}
