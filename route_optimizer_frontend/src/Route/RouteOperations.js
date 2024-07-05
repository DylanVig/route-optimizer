import { RouteReceiveRequest } from '../util/receiveApi.js'
import { RouteSendRequest } from '../util/sendApi.js'

const RouteOperations = {
    optimize: (locations, setOptimizedRoute) => {
        const success = (data) => {
            console.log("Successful");
            setOptimizedRoute(data);
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Optimization failed: " + message);
        };
        RouteReceiveRequest.getOptimizedRoute(locations, success, failure);
    },
    save: (userId, routeName, routeDescription, optimizedRoute) => {
        const success = (data) => {
            console.log("Successful");
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Save failed: " + message);
        };
        RouteSendRequest.saveRoute(userId, routeName, routeDescription, optimizedRoute, success, failure);
    }
}

export default RouteOperations;