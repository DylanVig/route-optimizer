import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import RouteLogOperations from "./RouteLogOperations.js";
import "./RouteLog.css";
import Popup from "reactjs-popup";
import MapDisplay from "../MapDisplay/MapDisplay.js";

const RouteLog = forwardRef(({ userId }, ref) => {
    const [allRoutes, setAllRoutes] = useState([]);

    const updateAllRoutes = () => {
        RouteLogOperations.getRoutes(userId, setAllRoutes);
    };

    useEffect(() => {
        updateAllRoutes();
    }, [userId]);

    useImperativeHandle(ref, () => ({
        updateAllRoutes
    }));

    const deleteRoute = (routeId) => {
        RouteLogOperations.deleteRoute(routeId)
        .then(() => {
            updateAllRoutes();
        })
        .catch(error => console.error("Failed to delete route:", error));
    };

    return (
        <div>
            <button onClick={updateAllRoutes}>Refresh</button>
            <div className="routeLogsContainer">
                {allRoutes.map((route) => (
                    <div className="log" key={route.id}>
                        <h3>{route.routeName}</h3>
                        <p>{route.routeDescription}</p>
                        <Popup
                            trigger={<button className="button"> Show Route </button>}
                            modal
                            nested
                        >
                            {(close) => (
                                <div className="modal">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <center>
                                        <div
                                            className="header"
                                            style={{ fontSize: "32px", fontWeight: "bold" }}
                                        >
                                            {route.routeName}
                                        </div>
                                        <div className="scrollable-content">
                                            <p>{route.routeDescription}</p>
                                            <ol className="routeOrder">
                                                {route.routeOrder.map((location, index) => (
                                                    <li key={index}>{location}</li>
                                                ))}
                                            </ol>
                                            <MapDisplay locations={route.routeOrder} />
                                        </div>
                                    </center>
                                </div>
                            )}
                        </Popup>
                        <Popup
                            trigger={<button className="button"> Delete </button>}
                            modal
                            nested
                        >
                            {(closePopup) => (
                                <div className="modal">
                                    <button className="close" onClick={closePopup}>
                                        &times;
                                    </button>
                                    <center>
                                        <div
                                            className="header"
                                            style={{ fontSize: "20px", display: "flex", flexDirection: "column" }}
                                        >
                                            Are you sure you want to delete this route? This data will be permanently lost.
                                            <center>
                                                <button onClick={() => {deleteRoute(route.id); closePopup()}} style={{ width: "55px" }}>Delete</button>
                                            </center>
                                        </div>
                                    </center>
                                </div>
                            )}
                        </Popup>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default RouteLog;
