/* global google */
import React, { useEffect } from 'react';
import { scriptSrc } from './MapDisplayApi.js'

export default function MapDisplay({ locations }) {

  function geocodeAddresses(addresses) {
    const geocoder = new google.maps.Geocoder();
    const geocodePromises = addresses.map((address) => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng()
            });
          } else {
            reject(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      });
    });
  
    return Promise.all(geocodePromises)
      .then((latLngArray) => {
        console.log('All addresses have been geocoded:');
        console.log(latLngArray);
        return latLngArray;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function initMap() {
      const waypointList = await geocodeAddresses(locations);
      console.log(waypointList);
      
      if (typeof google !== 'undefined' && google.maps) {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: waypointList[0],
          zoom: 14,
        });

      waypointList.map((location) => (new google.maps.Marker({
        map: map,
        position: location
      })))

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#FF0000',
          },
        });

        const waypoints = waypointList.slice(1, waypointList.length - 1).map(location => ({
          location: new google.maps.LatLng(location.lat, location.lng)  // Changed: Convert to LatLng objects
        }));

        const request = {
          origin: waypointList[0],
          destination: waypointList[waypointList.length - 1],
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        });
      } else {
        console.error('Google Maps library is not loaded.');
      }
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      delete window.initMap;
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        while (mapContainer.firstChild) {
          mapContainer.removeChild(mapContainer.firstChild);
        }
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}
