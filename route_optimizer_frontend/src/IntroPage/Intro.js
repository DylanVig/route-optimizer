import Login from '../Login/Login.js'
import './Intro.css'

export default function Intro({ handleLogin }) {


    return (
        <div className="intro">
            <center>
                <h1>Tour Guide Optimizer</h1>
                <Login onLogin={handleLogin} /> 
            </center>
        </div>
    )
}