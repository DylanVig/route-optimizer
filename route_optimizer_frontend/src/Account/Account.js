import React, { useState, useEffect } from 'react';
import { AccountOperations } from './AccountOperations.js';

export default function Account({ userId }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const success = (data) => {
            console.log("Data received:", data); // Debugging line to check received data
            if (data && typeof data === 'object') {
                setUsername(data.username);
                setPassword(data.password);
                setName(data.name);
                console.log("Username set to:", data.username); // Debugging line to check state update
                console.log("Password set to:", data.password); // Debugging line to check state update
                console.log("Name set to:", data.name); // Debugging line to check state update
            } else {
                console.log("Unexpected data format:", data);
            }
        };
        const failure = (message) => {
            console.log("Failed: " + message);
            alert("Retrieval Failed: " + message);
            setError(message);
        };
        AccountOperations.getUserDetails(userId, success, failure);
    }, [userId]);

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div>
            <h1>Hi {name}</h1>
            <button>Create Route</button>
        </div>
    );
}
