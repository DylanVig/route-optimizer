import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Route.css";
import RouteOperations from './RouteOperations.js'

export default function Route({ user }) {
  const [routeName, setRouteName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
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
    setOptimizedRoute(JSON.stringify(optimizedRoute));
  }

  const handleLocationChange = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
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
      <div>
        <p>Selected number of locations: {locationNum}</p>
        <p>Locations: {JSON.stringify(locations)}</p>
        <p>Location Num: {locationNum}</p>
      </div>
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
          </div>
        )}
      </div>
      <button>Save Route</button>
    </div>
  );
}
