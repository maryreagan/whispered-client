import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RoomView({ token, users }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    let { id } = useParams();
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
                console.log(json);
            })
            .catch((err) => console.log(err));
    };
    const getMessages = () => {
        let url = "https://whispered-bea588220020.herokuapp.com/message/room/" + id;
        console.log("calling this function");
        console.log(users);
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setMessages(json.findMessages);
                getUsers(json.findMessages);
                console.log(json);
            })
            .catch((err) => console.log(err));
    };
    function getUsers(messages) {
        let url = "https://whispered-bea588220020.herokuapp.com/user/";
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                let newMessages = messages.map((message) => {
                    let user = json.findAll.find(
                        (user) => user._id === message.user_id
                    );
                    message.user = user.fName;
                    console.log(message);
                    return message;
                });
                setMessages(newMessages);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getRoom();
        getMessages();
    }, [id]);
    const handleSend = () => {
        let url = "https://whispered-bea588220020.herokuapp.com/message/create/" + id;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                body: newMessage,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                getMessages();
            })
            .catch((err) => console.log(err));
            //clear input
            setNewMessage("");
    };
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="message-container">
                {messages
                    ? messages.map((message, index) => {
                          return (
                              <div className="message" key={index}>
                                  <h3>{message.user}</h3>
                                  <p>{message.body}</p>
                              </div>
                          );
                      })
                    : null}
                <div className="message-form">
                    <input
                        type="text"
                        placeholder="Send a Message..."
                        className="new-message"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    />
                    <button onClick={() => {handleSend()}}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default RoomView;
