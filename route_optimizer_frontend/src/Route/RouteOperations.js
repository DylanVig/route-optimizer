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
        return new Promise((resolve, reject) => {
            const success = (data) => {
                console.log("Successful");
                resolve(data); // Resolve the promise on success
            };
            const failure = (message) => {
                console.log("Failed: " + message);
                alert("Save failed: " + message);
                reject(new Error(message)); // Reject the promise on failure
            };
            RouteSendRequest.saveRoute(userId, routeName, routeDescription, optimizedRoute, success, failure);
        });
    }
}

export default RouteOperations;
