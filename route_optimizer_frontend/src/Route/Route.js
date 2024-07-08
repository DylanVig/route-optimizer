import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Route.css";
import RouteOperations from './RouteOperations.js';
import MapDisplay from "../MapDisplay/MapDisplay.js";

export default function Route({ user, closePopup, updateAllRoutes }) { // Add updateAllRoutes as a prop
  const [routeName, setRouteName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [locationNum, setLocationNum] = useState(4);
  const [locations, setLocations] = useState(Array(4).fill(""));
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  const options = [
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
  ];

  const handleSelect = (option) => {
    setLocationNum(option.value);
    setLocations(Array(option.value).fill(""));
  };

  const optimizeRoute = () => {
    RouteOperations.optimize(locations, setOptimizedRoute);
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const handleSaveRoute = () => {
    RouteOperations.save(user, routeName, routeDescription, optimizedRoute);
    updateAllRoutes();
    closePopup();
  };

  const selectedOption = options.find((option) => option.value === locationNum);

  return (
    <div className="route">
      <input
        type="text"
        name="routeName"
        placeholder="Route Name"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <textarea
        name="routeDescription"
        cols="30"
        rows="5"
        placeholder="Route Description"
        value={routeDescription}
        onChange={(e) => setRouteDescription(e.target.value)}
        required
      />
      <div className="dropdown">
        <Dropdown
          options={options}
          onChange={handleSelect}
          value={selectedOption}
          placeholder="Select an option"
        />
      </div>
      {Array.from({ length: locationNum }).map((_, index) => (
        <input
          key={index}
          type="text"
          name={`location${index}`}
          placeholder={`Location ${index + 1}`}
          value={locations[index]}
          onChange={(e) => handleLocationChange(index, e.target.value)}
          required
        />
      ))}
      <button onClick={optimizeRoute}>Generate Route</button>
      <div>
        {optimizedRoute.length > 0 && (
          <div>
            <p>Here is the order of locations:</p>
            <ol>
              {optimizedRoute.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ol>
            <MapDisplay locations={optimizedRoute}/>
          </div>
        )}
      </div>
      <button onClick={handleSaveRoute}>Save Route</button>
    </div>
  );
}
