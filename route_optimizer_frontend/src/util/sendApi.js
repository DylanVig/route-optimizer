import $ from 'jquery'

export const RegisterRequest = {
    registerAccount: function (name, username, password, successCallback, failureCallback) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/user/register',
            method: 'POST',
            headers: { 
                Name: name, 
                Username: username, 
                Password: password 
            }
        })
            .done(successCallback)
            .fail(failureCallback)
    }
}

export const RouteSendRequest = {
    saveRoute: function(userId, routeName, routeDescription, routeOrder, successCallback, failureCallback) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/route/save-route',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                userId: userId,
                routeName: routeName,
                routeDescription: routeDescription,
                routeOrder: routeOrder
            })
        })
            .done(successCallback)
            .fail(failureCallback)
    }
}