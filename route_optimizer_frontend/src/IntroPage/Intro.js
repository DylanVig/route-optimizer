import Login from '../Login/Login.js'
import './Intro.css'
import { useState, useEffect } from 'react'

export default function Intro({ handleLogin }) {
    
    const [loaded, setLoaded] = useState(0); 

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(1), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="intro">
            <center style={{
            opacity: loaded,
            transition: "opacity 800ms ease-in",
            filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)",
          }}>
                <div className="introTitle">
                    <h1>Tour Guide Optimizer</h1>
                </div>
                <Login onLogin={handleLogin} /> 
            </center>
        </div>
    )
}