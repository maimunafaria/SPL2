import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import background1 from './background1.jpg';
import profile from './profile.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './directorDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export function DirectorProfile() {
    const [showAlert, setShowAlert] = useState(false);

    function handleLogout() {
        setShowAlert(true);
    }

    ;

    function handleConfirmLogout(confirm) {
        setShowAlert(false);
        if (confirm) {
            // Perform logout logic here
            console.log("Logging out...");

            window.location.href = "/";
        }
    }
    const { email } = useParams();

    const [directorInformation, setDirectorInformation] = useState({});
    useEffect(() => {
        Axios.get(`http://localhost:12280/director/${email}`).then((response) => {
            setDirectorInformation(response.data);
            console.log(response.data);
        });
    }, [])
    const [authState, setAuthState] = useState(false);
    const authenticate = (userType) => {
        Axios.get("http://localhost:12280/auth/", {
            headers: {
                accessToken: localStorage.getItem("accessToken")

            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState(false);
            } else {
                if (response.data.userType == userType && response.data.email == email) {
                    setAuthState(true);
                }
            }
        });
    }

    useEffect(() => {
        authenticate("Director");
    }, []);
    return (
        <>
            {
                authState && (
                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >



                        <section class="okay">
                            <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
                                <Container>
                                    <Navbar.Brand as={Link} to={`/directorDashboard/${email}`}>
                                        <img
                                            src={`http://localhost:12280/directorImages/${directorInformation.photo}`}
                                            height="50"
                                            className="d-inline-block align-top"
                                            alt="Logo"
                                        />
                                    </Navbar.Brand>
                                    <Nav.Link as={Link} to={`/directorDashboard/${email}`} className="active">Director Dashboard</Nav.Link>

                                    <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                                        <Nav className="ml-auto">

                                            <NavDropdown title="Settings" id="dropdown02" className="active">
                                                <NavDropdown.Item as={Link} to={`/directorDashboard/${email}/directorResetPassword`}>Reset Password</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to={`/directorDashboard/${email}/directorEditInfo`}>Update Informations</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link as={Link} to={`/directorDashboard/${email}`} className="active">Back</Nav.Link>
                                            <Nav.Link onClick={handleLogout} className="active">Logout</Nav.Link>
                                        </Nav>
                                        {showAlert && (
                                            <div className="alert-container">
                                                <div className="alert alert-warning bg-transparent" >
                                                    <p>Are you sure you want to log out?</p>
                                                    <button
                                                        className="btn btn-danger mr-2"
                                                        onClick={() => handleConfirmLogout(true)}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => handleConfirmLogout(false)}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </section>


                        <section>

                            <div className="card mb-3 mx-auto" >
                                <div className="row no-gutters">
                                    <div className="col-md-4" >
                                        <img src={`http://localhost:12280/directorImages/${directorInformation.photo}`}
                                            className="card-img"
                                            alt="teacher photo"
                                            style={{ height: "500px", width: "auto", paddingLeft: "200px" }}

                                        />
                                    </div>
                                    <div className="col-md-8 " >
                                        <div className="card-body">
                                            <p className="card-title"> <b><strong>Name:</strong></b> {directorInformation.name}</p>
                                            <p className="card-text-"> <b><strong>Email:</strong></b>  {directorInformation.UserEmail}</p>
                                            <p className="card-text"><b><strong>Phone:</strong></b> {directorInformation.phoneNum}</p>
                                            <p className="card-text"><b><strong>Current Address:</strong></b> {directorInformation.currentAddr}</p>
                                            <p className="card-text"><b><strong>Department Name: </strong></b>{directorInformation.deptName}</p>
                                            <p className="card-text"><b><strong>Gender:</strong></b> {directorInformation.gender}</p>
                                            <p className="card-text"><b><strong>Id:</strong></b> {directorInformation.id}</p>
                                            <p className="card-text"><b><strong>Permanent Address:</strong></b> {directorInformation.permanentAddr}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="footer" style={{ position: "fixed", bottom: "0", width: "100%" }}>
                            <div class="container">
                                <div class="row ">
                                    <div class="col-lg-6">
                                        <p class="mb-0">Copyrights © 1222 | 1228 </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
        </>
    );
}

export default DirectorProfile;