import React, { useState, useEffect } from "react";
import RouteLogOperations from "./RouteLogOperations.js";
import "./RouteLog.css"

export default function RouteLog({ userId }) {

    const [allRoutes, setAllRoutes] = useState([]);

    const updateAllRoutes = () => {
        RouteLogOperations.getRoutes(userId, setAllRoutes);
    }
    
    return (
        <div>
            <button onClick={updateAllRoutes}>Refresh</button>
            <ul>
                {allRoutes.map(route => (
                    <ul className="log" key={route.id}>
                        <h3>{route.routeName}</h3>
                        <p>{route.routeDescription}</p>
                        <ul>
                            {route.routeOrder.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))}
                        </ul>
                    </ul>
                ))}
            </ul>
        </div>
    )
}