/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/404";
import Auth from "./components/Auth/Auth";
import Update from "./components/main-pages/Update";
import "./App.css";
import Nav from "./components/constants/Nav";
import Header from "./components/constants/Header";
import Add from "./components/main-pages/Add";
import RoomView from "./components/main-pages/RoomView";

function App() {
    const [sessionToken, setSessionToken] = useState(undefined);
    const [myRooms, setMyRooms] = useState([]);
    const [id, setId] = useState(undefined);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setSessionToken(localStorage.getItem("token"));
            getRooms();
          }
    }, [sessionToken]);
    const updateLocalStorage = (newToken) => {
        localStorage.setItem("token", newToken);
        setSessionToken(newToken);
    };

    // Logout button function
    const clearLocalStorage = () => {
        localStorage.clear();
        setSessionToken(undefined);
    };

    function getRooms() {
        console.log(sessionToken);
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/myrooms";
        let token = sessionToken;
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setMyRooms(json);
                setId(json.decode);
                setAdmin(json.isAdmin);
                console.log(json);
            })
            .catch((err) => console.log(err));
    }


    return (
        <div className="main-container">
            {sessionToken === undefined ? (
                <div className="auth-view">
                    <Router>
                        <Routes>
                            <Route
                                path="*"
                                element={
                                    <Auth
                                        updateLocalStorage={updateLocalStorage}
                                    />
                                }
                            />
                        </Routes>
                    </Router>
                </div>
            ) : (
                <div>
                        <Router>
                    <div className="header-container">
                        <Header clearLocalStorage={clearLocalStorage} />
                    </div>
                    <div className="nav-container">
                        <Nav myRooms={myRooms} id={id} admin={admin} />
                    </div>
                    <div className="content-container">
                            <Routes>
                                <Route path="/" element={<Add />} />
                                <Route path="/view/:id" element={<RoomView token={sessionToken}/>} />
                                <Route path="/update/:id" element={<Update token={sessionToken}/>} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                    </div>
                        </Router>
                </div>
            )}
        </div>
    );
}

export default App;
