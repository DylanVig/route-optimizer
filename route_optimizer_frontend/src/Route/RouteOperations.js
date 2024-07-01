import { RouteRequest } from '../util/receiveApi.js'

const RouteOperations = {
    optimize: (locations) => {
        const success = (data) => {
            console.log("Successful");

        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Login failed: " + message);
        };
        RouteRequest.getOptimizedRoute(locations, success, failure);
    }
}

export default RouteOperations;