export const LoginRequest = {
    loginAccount: function (username, password, successCallback, failureCallback) {
        fetch('http://localhost:8080/api/v1/user/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Username': username,
                'Password': password
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Incorrect Username or Password');
            }
            else {
                return response.json();
            }
        })
        .then(data => {
            successCallback(data);
        })
        .catch(error => {
            failureCallback(error.message);
        });
    }
}
