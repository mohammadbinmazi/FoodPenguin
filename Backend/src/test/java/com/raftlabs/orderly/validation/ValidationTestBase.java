package com.raftlabs.orderly.validation;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;

import java.util.Set;

abstract class ValidationTestBase {

    protected Validator validator;

    @BeforeEach
    void setupValidator() {
        ValidatorFactory factory =
                Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }
}

