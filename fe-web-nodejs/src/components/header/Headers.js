import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import { logout } from "../../service/loginService";
import Cookies from "js-cookie";
function Header() {
    const [username, setUsername] = useState("");
    const [role, setURole] = useState("");
    useEffect(() => {
        const storedUsername = Cookies.get("info");
       
        if (storedUsername) {
            const userData = JSON.parse(storedUsername);
            setUsername(`${userData.imgAvt}`);
            setURole(`${userData.admin}`)
        }
    }, []);
    const handleLogout = () => {
        logout();
        setUsername('')
    };
    return (
        <header id="header" className="fixed-top">
            <div className="container-fluid bg-light position-relative shadow ">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
                    <a href="/" className="navbar-brand font-weight-bold text-secondary" style={{ fontSize: '50px' }}>
                        <i className="flaticon-043-teddy-bear"></i>
                        <span className="text-primary">Kid ABC</span>
                    </a>
                    <div className="navbar-nav text-lg  font-weight-bold py-0">
                        <a href="/" className="nav-item nav-link text-lg">Timetable</a>
                        <a href="/" className="nav-item nav-link text-lg">Proposal</a>
                        <a href="/" className="nav-item nav-link text-lg">Announcement</a>
                        <a href="/class" className="nav-item nav-link text-lg">Class</a>
                    </div>
                    <div className="navbar-nav font-weight-bold mx-auto py-0">

                    </div>
                  
                    {!username && (
                        <Link to="/login" className="btn btn-primary px-5">
                            Login
                        </Link>
                    )}
                    {username && (
                          <div className="navbar-nav font-weight-bold py-0 d-flex mr-2">
                          <Dropdown >
                              <Dropdown.Toggle variant="light" id="dropdown-basic" >
                              <img  src={username} className="w-[40px] h-[40px] round-full"></img>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                  {role === "true" ? (  <Dropdown.Item href="/add-class">Create Class</Dropdown.Item>):(<div></div>)}
                                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                      </div>
                        
                    )}

                </nav>
            </div>
        </header>

    );
}

export default Header;