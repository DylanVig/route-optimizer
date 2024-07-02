package com.example.route_optimizer_backend.route;

import com.example.route_optimizer_backend.user.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

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
                "5 W 93 Street, New York, NY 10025",
                "47 W 13th St, New York, NY 10011",
                "20 Cooper Square, New York, NY 10003"
        };
        routeService.travelTimeMatrix(locations);
    }

    /**
    @RequestMapping(value = "/optimizer", method = RequestMethod.GET)
    public String[] optimizer(@RequestHeader("Locations") String[] locations) {
        for (int i = 0; i < locations.length; i++) {
            System.out.println(locations[i]);
        }
        int[][] travelTimeMatrix = routeService.travelTimeMatrix(locations);
        return routeService.optimizedTimeRoute(travelTimeMatrix, locations);
    }
     */

    @RequestMapping(value = "/optimizer", method = RequestMethod.POST)
    public String[] optimizer(@RequestBody JsonNode requestBody) {
        System.out.println("Call Received");
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String[] locations = objectMapper.convertValue(requestBody.get("locations"), String[].class);
            System.out.println("Received locations: " + Arrays.toString(locations)); // Log the received locations
            System.out.println("Locations Length: " + locations.length);
            int[][] travelTimeMatrix = routeService.travelTimeMatrix(locations);
            return routeService.optimizedTimeRoute(travelTimeMatrix, locations);
        } catch (Exception e) {
            e.printStackTrace();
            return new String[0];
        }
    }

    @RequestMapping(value = "/save-route", method = RequestMethod.POST)
    public void saveRoute(@RequestHeader("RouteName") String routeName,
                          @RequestHeader("UserId") Long userId,
                          @RequestHeader("RouteDescription") String routeDescription,
                          @RequestHeader("RouteOrder") String[] routeOrder) {
        routeService.addNewRoute(new Route(userId, routeName, routeDescription, routeOrder));
    }

}
