package com.raftlabs.orderly.model.menu.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class MenuCreateRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String category;

    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotNull
    private MultipartFile image;
}



