import { RouteLogReceiveRequest } from "../util/receiveApi.js";
import { RouteLogSendRequest } from "../util/sendApi.js";

const RouteLogOperations = {
    getRoutes: (userId, setAllRoutes) => {
        const success = (data) => {
            console.log("Successful");
            setAllRoutes(data)
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Route List Retrieval failed: " + message);
        };
        RouteLogReceiveRequest.getRouteList(userId, success, failure);
    },
    deleteRoute: (routeId) => {
        return new Promise((resolve, reject) => {
            const success = (data) => {
                console.log("Successful");
                resolve(data);
            };
            const failure = (message) => {
                console.log("Failed: " + message);
                alert("Delete Route failed: " + message);
                reject(new Error(message));
            };
            RouteLogSendRequest.deleteRoute(routeId, success, failure);
        });
    }
}

export default RouteLogOperations;