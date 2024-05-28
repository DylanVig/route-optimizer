import { LoginRequest } from '../util/receiveApi.js'
import { RegisterRequest } from '../util/sendApi.js'

const LoginOperations = {
    login: (username, password, onLogin) => {
        const success = (data) => {
            console.log("Successful");
            onLogin(data); // Pass the user data to onLogin
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Login failed: " + message); // Notify the user of the failure
        };
        LoginRequest.loginAccount(username, password, success, failure);
    },
    register: (name, username, password) => {
        const success = () => {
            console.log("Successful")
            alert("Registration Successful")
        }
        const failure = () => {
            console.log("Failed")
            alert("Registration Failed: Username has already been taken")
        }
        RegisterRequest.registerAccount(name, username, password, success, failure);
    }
}

export default LoginOperations;