package com.example.route_optimizer_backend.route;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/route")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @RequestMapping(value = "/two-locations", method = RequestMethod.GET)
    public void twoLocationCalculation() {
        routeService.singleDistanceCalculator("141 W 24 Street, New York, NY 10011", "5 W 93rd Street, New York, NY 10025");
    }
}
