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
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export function DirectorResetPassword() {
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

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newPassword.match(confirmNewPassword)) {
            toast.error('Password & Confirm Password do not match');
        }
        // Perform action to save the form data
        console.log("Form submitted:", {
            password,
            newPassword,
            confirmNewPassword,
        });
        // Reset form values
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

    };

    const { email } = useParams();
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
                                            src={logo}
                                            height="50"
                                            className="d-inline-block align-top"
                                            alt="Logo"
                                        />
                                    </Navbar.Brand>
                                    <Nav.Link as={Link} to={`/directorDashboard/${email}`} className="active">Director Dashboard</Nav.Link>
                                    <Navbar.Toggle aria-controls="navbarsExample09" aria-label="Toggle navigation">
                                        <span className="ti-align-justify"></span>
                                    </Navbar.Toggle>
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
                        <div style={{ width: "70%", margin: "auto", height: "750px", marginTop: "10rem" }}>
                            <ToastContainer />
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter current password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)} required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password "
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)} required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formConfirmNewPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new passwordagain"
                                        value={confirmNewPassword}
                                        onChange={(event) => setConfirmNewPassword(event.target.value)} required
                                    />
                                </Form.Group>

                                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                                    <Button variant="primary" type="submit" >

                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>

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

export default DirectorResetPassword;