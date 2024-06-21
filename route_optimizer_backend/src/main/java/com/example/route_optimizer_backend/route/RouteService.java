package com.example.route_optimizer_backend.route;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.convert.ValueConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class RouteService {

    @Value("${google.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public RouteService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Calculate the distance between two locations given addresses
     */
    public int singleDistanceValueCalculator(String origin, String destination) {
        String origin_coords = getCoordinates(origin);
        String destination_coords = getCoordinates(destination);
        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/distancematrix/json")
                .queryParam("origins", origin_coords)
                .queryParam("destinations", destination_coords)
                .queryParam("key", apiKey)
                .toUriString();
        System.out.println(url);
        String jsonString = restTemplate.getForObject(url, String.class);
        JSONObject obj = new JSONObject(jsonString);
        JSONArray results = obj.getJSONArray("rows");
        JSONObject firstResult = results.getJSONObject(0);
        JSONArray elements = firstResult.getJSONArray("elements");
        JSONObject firstResult1 = elements.getJSONObject(0);
        JSONObject distance = firstResult1.getJSONObject("distance");
        int value = distance.getInt("value");
        return value;
    }

    /**
     * Calculate the time estimate for commute between two locations given addresses
     */
    public int singleTimeValueCalculator(String origin, String destination) {
        String origin_coords = getCoordinates(origin);
        String destination_coords = getCoordinates(destination);
        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/distancematrix/json")
                .queryParam("origins", origin_coords)
                .queryParam("destinations", destination_coords)
                .queryParam("key", apiKey)
                .toUriString();
        String jsonString = restTemplate.getForObject(url, String.class);
        JSONObject obj = new JSONObject(jsonString);
        JSONArray results = obj.getJSONArray("rows");
        JSONObject firstResult = results.getJSONObject(0);
        JSONArray elements = firstResult.getJSONArray("elements");
        JSONObject firstResult1 = elements.getJSONObject(0);
        JSONObject distance = firstResult1.getJSONObject("duration");
        int value = distance.getInt("value");
        return value;
    }

    /**
     * Calculates the travel time matrix for the list of locations
     */
    public int[][] travelTimeMatrix(String[] locations) {
        int[][] timeTable = new int[locations.length][locations.length];
        for (int i = 0; i < locations.length; i++) {
            for (int j = 0; j < locations.length; j++) {
                if (i == j) {
                    timeTable[i][j] = 0;
                }
                else {
                    timeTable[i][j] = singleTimeValueCalculator(locations[i], locations[j]);
                }
            }
        }
        return timeTable;
    }

    public int calculateTourTime(int[][] travelTimeMatrix, int[] route) {
        int routeTime = 0;
        for (int i = 0; i < route.length - 1; i++) {
            routeTime += travelTimeMatrix[route[i]][route[i+1]];
        }
        routeTime += travelTimeMatrix[route[route.length - 1]][route[0]];
        return routeTime;
    }

    // TODO: Solved the create permutations challenge, now all I need to do is convert it to travel times and
    // actually finish the problem!!!

    /**
     * Optimized route based on time estimates, returned in an integer array indicating
     * the indexes in the travelTimeMatrix
     * Need to do permutations part
     */
    public String[] optimizedTimeRoute(int[][] travelTimeMatrix, String[] locations) {
        // If there are less than 8 locations, it is more efficient to brute force it than use
        // an algorithm
        // TODO Make permutations part then use to fill in the methods
        if (locations.length <= 7) {
            return bruteForceRoute(travelTimeMatrix, locations, permutations(locations));
        }
        else {
            return new String[]{"hi"};
            // return heldKarpAlgorithmRoute(travelTimeMatrix, locations);
        }
    }

    private void permute (int[] indexes, int l, int r, List<int[]> permutations) {
        if (l == r) {
            permutations.add(indexes.clone());
        }
        else {
            for (int i = l; i <= r; i++) {
                indexes = swap(indexes, l, i);
                permute(indexes, l + 1, r, permutations);
                indexes = swap(indexes, l, i);
            }
        }
    }

    private int[] swap (int[] a, int i, int j) {
        int x = a[i];
        a[i] = a[j];
        a[j] = x;
        return a;
    }

    public List<int[]> permutations (String[] locations) {
        List<int[]> permutations = new ArrayList<>();
        int[] indexes = new int[locations.length];
        for (int i = 0; i < locations.length; i++) {
            indexes[i] = i;
        }
        permute(indexes, 0, locations.length - 1, permutations);
        return permutations;
    }

    public String[] bruteForceRoute(int[][] travelTimeMatrix, String[] locations, List<int[]> permutations) {
        String[] finalRoute = new String[travelTimeMatrix.length + 1];
        int[] optimizedRoute = new int[travelTimeMatrix.length];
        for (int i = 0; i < travelTimeMatrix.length; i++) {
            optimizedRoute[i] = i;
        }
        int optimizedTourCost = calculateTourTime(travelTimeMatrix, optimizedRoute);
        for (int[] permutation: permutations) {
            int tourCost = calculateTourTime(travelTimeMatrix, permutation);
            if (tourCost < optimizedTourCost) {
                optimizedTourCost = tourCost;
                optimizedRoute = permutation.clone();
            }
        }
        for (int i = 0; i < optimizedRoute.length; i++) {
            finalRoute[i] = locations[optimizedRoute[i]];
        }
        finalRoute[finalRoute.length - 1] = locations[0];
        return finalRoute;
    }

//    public int[] heldKarpAlgorithmRoute(int[][] travelTimeMatrix, String[] locations) {
//        int[] optimizedRoute = new int[travelTimeMatrix.length];
//    }

//    public String singleDistanceCalculator(String origi) {
//        // Get coordinates for origin and destination
//        String origin = getCoordinates("141 W 24 Street, New York, NY 10011");
//        String destination = getCoordinates("5 W 93 Street, New York, NY 10025");
//
//        // Construct the URL with valid coordinates
//        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/distancematrix/json")
//                .queryParam("origins", origin)
//                .queryParam("destinations", destination)
//                .queryParam("key", apiKey)
//                .toUriString();
//
//        // Print the URL for debugging
//        System.out.println("Constructed URL: " + url);
//
//        // Send the request and print the response
//        String response = restTemplate.getForObject(url, String.class);
//        System.out.println("API Response: " + response);
//
//        // Return the response
//        return response;
//    }


    /** TODO: Make a distance matrix calculator by using multiple locations for origin and destination
     * This doesn't work
     * Scrapping this for now, will utilize a nested for-loop with the singleDistanceCalculator
     */
//    public String distanceMatrixCalculator(String locations) {
//        String location_coords = String.join("|", locations);
//        String[] origins_list = {
//                getCoordinates("141 W 24 Street, New York, NY 10011"),
//                getCoordinates("5 W 93 Street, New York, NY 10025")
//        };
//        String[] destinations_list = {
//                getCoordinates("141 W 24 Street, New York, NY 10011"),
//                getCoordinates("5 W 93 Street, New York, NY 10025")
//        };
//
//        String origins = String.join("|", origins_list);
//        String destinations = String.join("|", destinations_list);
//
//        System.out.println("Origin 1: " + origins_list[0]);
//        System.out.println("Origin 2: " + origins_list[1]);
//        System.out.println("Destination 1: " + destinations_list[0]);
//        System.out.println("Destination 2: " + destinations_list[1]);
//
//        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/distancematrix/json")
//                .queryParam("origins", origins)
//                .queryParam("destinations", destinations)
//                .queryParam("key", apiKey)
//                .toUriString();
//
//        // Print the URL for debugging
//        System.out.println("Constructed URL: " + url);
//
//        // Send the request and print the response
//        String response = restTemplate.getForObject(url, String.class);
//        System.out.println("API Response: " + response);
//
//        // Parse the response to get more detailed information
//        parseAndLogResponse(response);
//
//        return response;
//    }
//
//    private void parseAndLogResponse(String response) {
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode rootNode = objectMapper.readTree(response);
//
//            // Log origin addresses
//            JsonNode originAddresses = rootNode.path("origin_addresses");
//            System.out.println("Origin Addresses: " + originAddresses);
//
//            // Log destination addresses
//            JsonNode destinationAddresses = rootNode.path("destination_addresses");
//            System.out.println("Destination Addresses: " + destinationAddresses);
//
//            // Log rows and elements
//            JsonNode rows = rootNode.path("rows");
//            for (JsonNode row : rows) {
//                JsonNode elements = row.path("elements");
//                for (JsonNode element : elements) {
//                    JsonNode status = element.path("status");
//                    System.out.println("Element Status: " + status);
//                    if (status.asText().equals("OK")) {
//                        JsonNode distance = element.path("distance");
//                        JsonNode duration = element.path("duration");
//                        System.out.println("Distance: " + distance);
//                        System.out.println("Duration: " + duration);
//                    } else {
//                        System.out.println("Element Error: " + element);
//                    }
//                }
//            }
//        } catch (Exception e) {
//            System.out.println("Error");
//        }
//    }

    /**
     * Return the coordinates of an address to use in method
     */
    public String getCoordinates(String address) {
        try {
            String encodedAddress = URLEncoder.encode(address, StandardCharsets.UTF_8.toString());
            String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/geocode/json")
                    .queryParam("address", encodedAddress)
                    .queryParam("key", apiKey)
                    .toUriString();
            String jsonString = restTemplate.getForObject(url, String.class);
            JSONObject obj = new JSONObject(jsonString);
            JSONArray results = obj.getJSONArray("results");
            JSONObject firstResult = results.getJSONObject(0);
            JSONObject geometry = firstResult.getJSONObject("geometry");
            JSONObject location = geometry.getJSONObject("location");
            String lat = Double.toString(location.getDouble("lat"));
            String lng = Double.toString(location.getDouble("lng"));
            return lat + "," + lng;
        } catch (Exception e) {
            return null;
        }
    }
    /**
     * Return the Place ID of an address to potentially use later, currently unused
     */
    public String getPlaceId(String address) {
        try {
            String encodedAddress = URLEncoder.encode(address, StandardCharsets.UTF_8.toString());
            String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/geocode/json")
                    .queryParam("address", encodedAddress)
                    .queryParam("key", apiKey)
                    .toUriString();
            String jsonString = restTemplate.getForObject(url, String.class);
            JSONObject obj = new JSONObject(jsonString);
            JSONArray results = obj.getJSONArray("results");
            JSONObject firstResult = results.getJSONObject(0);
            String placeId = firstResult.getString("place_id");
            return placeId;
        } catch (Exception e) {
            return null;
        }
    }
}
