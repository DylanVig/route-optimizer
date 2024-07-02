import logo from './logo.svg';
import './App.css';
import Login from './Login/Login.js'
import MapDisplay from './MapDisplay/MapDisplay.js'
import Intro from './IntroPage/Intro.js'
import { useState, useEffect } from 'react'
import Account from './Account/Account.js'

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userId, setUserId ] = useState(0);

  function handleLogin(userData) {
    setUserId(userData.id);
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {
        !loggedIn ? (
          <center>
            <Intro onLogin={handleLogin} /> 
          </center>
        ): (
          <Account userId={userId} />
        )
      }
    </div>
  );
}

export default App;
