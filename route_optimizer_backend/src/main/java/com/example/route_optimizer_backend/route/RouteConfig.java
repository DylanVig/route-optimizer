package com.example.route_optimizer_backend.route;

import com.example.route_optimizer_backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/** When working with external APIs such as the Google APIs, we need to use HTTP requests to
 * communicate with them. The RestTemplate helps convert the HTTP requests into RESTful
 * web services, which can use HTTP methods and URLs to perform operations and stuff
 */
@Configuration
public class RouteConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    CommandLineRunner commandLineRunnerRoute(RouteRepository repository) {
        return args -> {

        };
    }
}
