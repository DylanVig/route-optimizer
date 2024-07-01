import { AccountRequest } from '../util/receiveApi.js';
import { RouteRequest } from '../util/sendApi.js';

export const AccountOperations = {
    getUserDetails: (userId, successCallback, failureCallback) => {
        const success = (data) => {
            console.log("Successful");
            successCallback(data);
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Retrieval Failed: " + message); 
            failureCallback(message);
        };
        AccountRequest.getUserDetails(userId, success, failure);
    },
    saveRoute: (routeName, userId, routeDescription, routeOrder, successCallback, failureCallback) => {
        const success = (data) => {
            console.log("Successful");
            successCallback(data);
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Failed to Save Route: " + message); 
            failureCallback(message);
        };
        RouteRequest.saveRoute(routeName, userId, routeDescription, routeOrder, success, failure)
    }
}
