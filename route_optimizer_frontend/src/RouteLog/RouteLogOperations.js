import { RouteLogReceiveRequest } from "../util/receiveApi.js";

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
    }
}

export default RouteLogOperations;