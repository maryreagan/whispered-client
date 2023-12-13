import React, {useState} from 'react'

function Login({updateLocalStorage}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e =>{
        e.preventDefault();
        let url = "https://whispered-bea588220020.herokuapp.com/user/login"
        let requestBody = {email: email, password: password}
        fetch(url, {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify(requestBody)
        })
        .then(res => res.json())
        .then(json => {
            updateLocalStorage(json.token)
        })

    }
    return (
        <div className='form-container'>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='email' placeholder='Email'/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='password' placeholder='Password'/>
            <button className='login' onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login