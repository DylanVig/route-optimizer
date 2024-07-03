/* global google */
import React, { useEffect } from 'react';

export default function MapDisplay({ locations }) {
  useEffect(() => {
    function initMap() {
      const origin = { lat: 40.744450, lng: -73.993900 };
      const destination = { lat: 40.727840, lng: -73.991539 };

      // Ensure google.maps is available
      if (typeof google !== 'undefined' && google.maps) {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: origin,
          zoom: 14,
        });

        const markerOrigin = new google.maps.Marker({
          map: map,
          position: origin,
          title: "Origin",
        });

        const markerDestination = new google.maps.Marker({
          map: map,
          position: destination,
          title: "Destination",
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        directionsRenderer.setMap(map);

        const request = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      } else {
        console.error('Google Maps library is not loaded.');
      }
    }

    initMap();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};
