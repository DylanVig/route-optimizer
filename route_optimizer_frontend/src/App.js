import logo from './logo.svg';
import './App.css';
import Login from './Login/Login.js'
import { useState } from 'react'

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {
        !loggedIn ? <Login onLogin={handleLogin} /> : <h1>Hi</h1>
      }
    </div>
  );
}

export default App;
