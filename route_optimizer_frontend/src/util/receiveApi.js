export const AccountRequest = {
    getUserDetails: function (userId, successCallback, failureCallback) {
        fetch('http://localhost:8080/api/v1/user/details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'UserId': userId,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Incorrect User ID');
            }
            return response.json();
        })
        .then(data => {
            successCallback(data);
        })
        .catch(error => {
            failureCallback(error.message);
        });
    }
};

// export const RouteRequest = {
//     getOptimizedRoute: function (locations, successCallback, failureCallback) {
//         fetch('http://localhost:8080/api/v1/route/optimizer', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Locations': locations
//             }
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Could not retrieve optimized route');
//             }
//             return response.json();
//         })
//         .then(data => {
//             successCallback(data);
//         })
//         .catch(error => {
//             failureCallback(error.message);
//         });
//     }
// }

export const RouteReceiveRequest = {
    getOptimizedRoute: function (locations, successCallback, failureCallback) {
        fetch('http://localhost:8080/api/v1/route/optimizer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ locations })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not retrieve optimized route');
            }
            return response.json();
        })
        .then(data => {
            successCallback(data);
        })
        .catch(error => {
            failureCallback(error.message);
        });
    }
}

export const RouteLogReceiveRequest = {
    getRouteList: function (userId, successCallback, failureCallback) {
        fetch('http://localhost:8080/api/v1/route/get-routes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'UserId': userId
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch routes');
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            console.log("Fetched data:", data);  // Log the actual data
            successCallback(data);
        })
        .catch(error => {
            failureCallback(error.message);
        });
    }
}

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
