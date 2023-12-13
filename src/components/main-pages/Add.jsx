import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Dropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css"
function Add() {
    const [name, setName] = useState("");
    let navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const handleSubmit = () => {
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/create";
        let token = localStorage.getItem("token");
        let newUsers = []
        addedUsers.forEach((user) => newUsers.push(user._id));
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                addedUsers: newUsers,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    };
    const getUsers = () => {
        let url = "https://whispered-bea588220020.herokuapp.com/user/";
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        })
            .then((res) => res.json())
            .then((json) => {setUsers(json.findAll)})
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="add-container">
            <h1>Create a room</h1>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <p>Added Users:</p>
            <div className="added-full-list">
            {addedUsers ? addedUsers.map((user, index) => {
                return (
                <div className="added-list" key={index}>
                    <p>{user.fName}</p>
                    {/* Remove user from addedUsers button */}
                    <button className="remove-button"
                        onClick={() => {
                            let newUsers = addedUsers;
                            newUsers.splice(index, 1);
                            setAddedUsers([...newUsers]);
                        }}
                    >
                        x
                    </button>
                </div>
                );
            }) : null}
            </div>
            <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                >
                    Add Users
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {users ? users.map((user, index) => {
                        return (
                            <Dropdown.Item
                                key={index}
                                onClick={() => {
                                    setAddedUsers([...addedUsers, user]);
                                }}
                            >
                                {user.fName}
                            </Dropdown.Item>
                        );
                    }) : null}
                </Dropdown.Menu>
            </Dropdown>
            <button className="create-room" onClick={() => {handleSubmit(); navigate("/whispered-client/")}}>Create Room</button>
        </div>
    );
}

export default Add;
