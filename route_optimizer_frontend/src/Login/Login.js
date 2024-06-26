import React from 'react'
import { useState } from 'react';
import LoginOperations from './LoginOperations.js'
import './Login.css'

export default function Login({ onLogin }) {
    const [name, setName] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    function login() {
        LoginOperations.login(loginUsername, loginPassword, (data) => {
            console.log("User ID:", data.id);
            console.log("User Name:", data.name);
            console.log("User Username:", data.username);
            onLogin(data);
        });
    }

    function register() {
        LoginOperations.register(name, registerUsername, registerPassword);
        setName('');
        setRegisterUsername('');
        setRegisterPassword('');
        setLoginUsername('');
        setLoginPassword('');
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={(e) => { e.preventDefault(); login(); }} className="formFormat">
                <input
                    type="text"
                    name="email"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <h1>Register</h1>
            <form onSubmit={(e) => { e.preventDefault(); register(); }} className="formFormat">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}