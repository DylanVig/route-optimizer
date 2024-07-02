import { RouteRequest } from '../util/receiveApi.js'

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
        RouteRequest.getOptimizedRoute(locations, success, failure);
    }
}

export default RouteOperations;