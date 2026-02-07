package com.raftlabs.orderly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OrderlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderlyApplication.class, args);
	}

}
