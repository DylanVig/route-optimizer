package com.example.route_optimizer_backend.route;

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

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

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
    public String singleDistanceCalculator(String origin, String destination) {
        String origin_coords = getCoordinates(origin);
        String destination_coords = getCoordinates(destination);
        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/distancematrix/json")
                .queryParam("origins", origin_coords)
                .queryParam("destinations", destination_coords)
                .queryParam("key", apiKey)
                .toUriString();
        System.out.println(url);
        System.out.println(restTemplate.getForObject(url, String.class));
        return restTemplate.getForObject(url, String.class);
    }

    /** TODO: Make a distance matrix calculator by using multiple locations for origin and destination
     * This doesn't work right now
     */
//    public String distanceMatrixCalculator(String[] locations) {
//        String location_coords = String.join("|", locations);
//        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/distancematrix/json")
//                .queryParam("origins", location_coords)
//                .queryParam("destinations", location_coords)
//                .queryParam("key", apiKey)
//                .toUriString();
//        System.out.println(url);
//        System.out.println(restTemplate.getForObject(url, String.class));
//        return restTemplate.getForObject(url, String.class);
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
