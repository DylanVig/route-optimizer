import React, { useState } from "react";
import axios from "axios";
import { tripAdvisorAPIKey } from "./API_KEY.js";

export default function TouristSites() {
    const [city, setCity] = useState("");
    const [sites, setSites] = useState([]);

    const fetchTouristSites = async () => {
        try {
            const response = await axios.get(`https://api.content.tripadvisor.com/api/v1/location/search`, {
                params: {
                    key: tripAdvisorAPIKey,
                    searchQuery: city,
                    category: 'attractions',
                    language: 'en'
                }
            });
            console.log(response)
            const { data } = response;
            // Extract relevant information
            const topSites = data.data.map(site => ({
                name: site.name,
                address: site.address_obj && site.address_obj.street1 ? site.address_obj.street1 : "No address available"
            }));
            setSites(topSites);
        } catch (error) {
            console.error("Error fetching tourist sites:", error);
        }
    };

    return (
        <div>
            <h1>Top 5 Tourist Sites in {city}</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={fetchTouristSites}>Search</button>
            <ul>
                {sites.map((site, index) => (
                    <li key={index}>
                        <strong>{site.name}</strong><br />
                        {site.address}
                    </li>
                ))}
            </ul>
        </div>
    );
}
