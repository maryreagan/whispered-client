/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
function Update({ token }) {
    let { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [initalRoom, setInitalRoom] = useState([]);
    const [existingUsers, setExistingUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const getRoom = () => {
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/" + id;
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setName(json.findOne[0].name);
                setDescription(json.findOne[0].description);
                setInitalRoom(json.findOne[0]);
                getAllUsers(json.findOne[0].addedUsers);
                console.log(json);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getRoom();
    }, [id]);
    const handleSubmit = () => {
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/update/" + id;
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                description: description,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                getRoom();
            })
            .catch((err) => console.log(err));
    };
    function getAllUsers(addedUsers) {
        let url = "https://whispered-bea588220020.herokuapp.com/user/";
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((res) => res.json())
            //check for users in addedUsers
            .then((json) => {
                let existingUsers = [];
                json.findAll.forEach((user) => {
                    addedUsers.forEach((addedUser) => {
                        if (user._id === addedUser) {
                            existingUsers.push(user);
                        }
                    });
                });
                setExistingUsers(existingUsers);
                setUsers(json.findAll);
                console.log(existingUsers);
            })
            .catch((err) => console.log(err));
    }
    function handleRemove(userId) {
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/remove-user/" + id;
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                addedUsers: userId,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                getRoom();
            })
            .catch((err) => console.log(err));
    }
    function handleAdd(userId){
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/add-user/" + id;
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                addedUsers: [userId],
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                getRoom();
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className="update-container">
            <h3>Update Room</h3>
            <h5>{initalRoom.name}</h5>
            <h5>{initalRoom.description}</h5>
            <div className="update-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"
                />
                <button onClick={handleSubmit}>Update</button>
            </div>
            <div className="updateUsers">
                <div className="remove-users">
                    <h4>Remove Users</h4>
                    <div className="remove-users-list">
                        {existingUsers
                            ? existingUsers.map((user, index) => {
                                  return (
                                      <div className="remove-user added-full-list" key={index}>
                                          <p>{user.fName}</p>
                                          <button
                                          className="user-button" 
                                              onClick={() =>
                                                  handleRemove(user._id)
                                              }
                                          >
                                              Remove
                                          </button>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
                <div className="addUsers">
                    <h4>Add Users</h4>
                    <div className="add-users-list">
                        {users
                            ? users.map((user, index) => {
                                  return (
                                      <div className="add-user added-full-list" key={index}>
                                          <p>{user.fName}</p>
                                          <button className="user-button" onClick={() => handleAdd(user._id)}>Add</button>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
