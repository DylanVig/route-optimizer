import { AccountRequest } from '../util/receiveApi.js';

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
    }
}
