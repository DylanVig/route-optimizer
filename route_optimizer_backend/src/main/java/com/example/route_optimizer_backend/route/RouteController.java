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

    @RequestMapping(value = "/distance-matrix", method = RequestMethod.GET)
    public void distanceMatrix(String[] location) {
        int[][] travelTimeMatrix = routeService.travelTimeMatrix(location);
        String[] optimizedRoute = routeService.optimizedTimeRoute(travelTimeMatrix, location);
        for (int i = 0; i < optimizedRoute.length; i++) {
            System.out.print(optimizedRoute[i] + " ");
        }
    }

    @RequestMapping(value = "/time-matrix", method = RequestMethod.GET)
    public void timeMatrix(String[] location) {
        String[] locations = {
                "141 W 24 Street, New York, NY 10011",
                "5 W 93 Street, New York, NY 10025"
        };
        routeService.travelTimeMatrix(locations);
    }

}