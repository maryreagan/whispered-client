import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import './auth.css';

function Auth(props) {
    const [login, setLogin] = useState(true);
    function handleClick() {
        setLogin(!login);
    }
  return (
    <div className='auth-box'>
        {login ? <Login updateLocalStorage={props.updateLocalStorage}/> : <Signup updateLocalStorage={props.updateLocalStorage}/>}
        <div className='switch-container'>
        <p>{login ? "Don't have an account?" : "Already have an account?"}</p>
        <button onClick={handleClick}>{login ? "Signup" : "Login"}</button>
        </div>
    </div>
  )
}

export default Auth