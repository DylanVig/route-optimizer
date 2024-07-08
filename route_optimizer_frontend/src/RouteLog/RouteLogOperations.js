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
        const success = (data) => {
            console.log("Successful");
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Delete Route failed: " + message);
        };
        RouteLogSendRequest.deleteRoute(routeId, success, failure);
    }
}

export default RouteLogOperations;