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
import './adminDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export function AdminEditInfo() {
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

    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [image, setImage] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform action to save the form data
        console.log("Form submitted:", {
            email,
            name,
            phone,

            gender,
            dob,
            image,
            currentAddress,
            permanentAddress,
        });
        // Reset form values
        setEmail("");
        setName("");
        setPhone("");

        setGender("");
        setDob("");
        setImage("");
        setCurrentAddress("");
        setPermanentAddress("");
    };

    const { email1 } = useParams();
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
                if (response.data.userType == userType && response.data.email == email1) {
                    setAuthState(true);
                }
            }
        });
    }

    useEffect(() => {
        authenticate("Admin");
    }, []);

    return (
        <>
            {
                authState && (
                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >


                        <section class="okay">
                            <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
                                <Container>
                                    <Navbar.Brand as={Link} to={`/adminDashboard/${email1}`}>
                                        <img
                                            src={logo}
                                            height="50"
                                            className="d-inline-block align-top"
                                            alt="Logo"
                                        />
                                    </Navbar.Brand>
                                    <Nav.Link as={Link} to={`/adminDashboard/${email1}`} className="active">Admin Dashboard</Nav.Link>
                                    <Navbar.Toggle aria-controls="navbarsExample09" aria-label="Toggle navigation">
                                        <span className="ti-align-justify"></span>
                                    </Navbar.Toggle>
                                    <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                                        <Nav className="ml-auto">

                                            <NavDropdown title="Settings" id="dropdown02" className="active">
                                                <NavDropdown.Item as={Link} to={`/adminDashboard/${email1}/adminResetPassword`}>Reset Password</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to={`/adminDashboard/${email1}//adminEditInfo`}>Update Informations</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link as={Link} to={`/adminDashboard/${email1}`} className="active">Back</Nav.Link>
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
                        <div style={{ width: "70%", margin: "auto", marginTop: '10px', marginBottom: '10px' }}>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                    >
                                        <option value="">Choose gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formDob">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dob}
                                        onChange={(event) => setDob(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formImage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        placeholder="Enter Image"
                                        value={image}

                                        onChange={(event) => setImage(event.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group controlId="formCurrentAddress">
                                    <Form.Label>Current Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter current address"
                                        value={currentAddress}

                                        onChange={(event) => setCurrentAddress(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPermanentAddress">
                                    <Form.Label>Permanent Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter permanent address"
                                        value={permanentAddress}

                                        onChange={(event) => setPermanentAddress(event.target.value)}
                                    />
                                </Form.Group>

                                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                                    <Button variant="primary" type="submit" >

                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>

                        <section class="footer">
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

export default AdminEditInfo;