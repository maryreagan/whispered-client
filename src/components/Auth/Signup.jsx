import React, {useState} from 'react'

function Signup({updateLocalStorage}) {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const handleSubmit = e =>{
        e.preventDefault();
        let url = "https://whispered-bea588220020.herokuapp.com/user/create"
        let requestBody = {fName: fName, lName: lName, email: email, password: password, bio: bio}
        fetch(url, {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify(requestBody)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            updateLocalStorage(json.token)
        })
        .catch(err => console.log(err))

    }
    return (
        <div className='form-container'>
            <input type="text" value={fName} onChange={e => setFName(e.target.value)} className='fName' placeholder='First Name'/>
            <input type="text" value={lName} onChange={e => setLName(e.target.value)} className='lName' placeholder='Last Name'/>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='email' placeholder='Email'/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='password' placeholder='Password'/>
            <textarea name="bio" value={bio} onChange={e => setBio(e.target.value)}cols="30" rows="10" placeholder='Tell us about yourself'></textarea>
            <button onClick={handleSubmit}className='signup'>Signup</button>
        </div>
    )
}

export default Signup