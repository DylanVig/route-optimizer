package com.example.route_optimizer_backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User dylan = new User(
                    1L,
                    "Dylan",
                    "drv36",
                    "Ryanv0817!"
            );
            User ryan = new User(
                    "Ryan",
                    "rvig19",
                    "dylanvig1"
            );
            repository.saveAll(List.of(dylan, ryan));
        };
    }

}
