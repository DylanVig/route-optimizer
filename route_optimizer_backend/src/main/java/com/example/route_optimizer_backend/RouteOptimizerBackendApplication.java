package com.example.route_optimizer_backend;

import com.example.route_optimizer_backend.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
public class RouteOptimizerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RouteOptimizerBackendApplication.class, args);
	}

}
