import React from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navdrop from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.css";
import "./constants.css";
function Nav({ myRooms, id, admin }) {
    const navigate = useNavigate();
    function deleteRoom(roomId) {
        let url = "https://whispered-bea588220020.herokuapp.com/rooms/delete/" + roomId;
        let token = localStorage.getItem("token");
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: token,
            }),
        })
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    };
    return (
        <div className="nav-content">
            <button className="home-button" onClick={() => navigate("/whispered-client/")}>
                Home
            </button>
            {myRooms.findAll
                ? myRooms.findAll.map((room, index) => {
                      return (
                        <Navbar key={index}>
                        <Container fluid>
                          <Navbar.Toggle aria-controls="navbar-dark-example" />
                          <Navbar.Collapse id="navbar-dark-example">
                            <Navdrop>
                              <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={room.name}
                                menuVariant="dark"
                              >
                                <NavDropdown.Item onClick={() => navigate("/whispered-client/view/" + room._id)}>
                                  Join
                                </NavDropdown.Item>
                                {id === room.user_id || admin === true ? <NavDropdown.Item onClick={() => navigate("/whispered-client/update/" + room._id)}>Update</NavDropdown.Item> : null}
                                {id === room.user_id || admin === true ? <NavDropdown.Item onClick={() => deleteRoom(room._id)}>
                                  Delete
                                </NavDropdown.Item>: null}
                              </NavDropdown>
                            </Navdrop>
                          </Navbar.Collapse>
                        </Container>
                      </Navbar>
                      );
                  })
                : null}
        </div>
    );
}

export default Nav;
