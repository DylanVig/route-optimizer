import { AccountRequest } from '../util/receiveApi.js';

export const AccountOperations = {
    getUserDetails: (userId, successCallback, failureCallback) => {
        const success = (data) => {
            console.log("Successful");
            successCallback(data); // Pass the data to the success callback
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Retrieval Failed: " + message); 
            failureCallback(message); // Pass the error message to the failure callback
        };
        AccountRequest.getUserDetails(userId, success, failure);
    },
}
