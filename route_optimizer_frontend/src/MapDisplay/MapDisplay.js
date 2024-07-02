/* global google */
import React, { useEffect } from 'react';

export default function MapDisplay() {
  useEffect(() => {
    let map;

    async function initMap() {
      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }

    initMap();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};
