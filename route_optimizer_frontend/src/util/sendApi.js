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