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
    CommandLineRunner commandLineRunnerUser(UserRepository repository) {
        return args -> {
            User dylan = new User(
                    1L,
                    "Dylan",
                    "dylanvig1",
                    "dylanvig1"
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
