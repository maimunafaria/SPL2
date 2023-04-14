import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Modal, Form, Button, Container, Navbar, Nav, NavDropdown, ModalFooter } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import background1 from './background1.jpg';
import profile from './profile.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './adminDashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import './footer.css'
// import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
export function ManageUser() {


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [classRoll, setClassRoll] = useState('');
    const [semester, setSemester] = useState('');


    let navigate = useNavigate()
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

    function handleSubmitDelete(event) {
        event.preventDefault();
        if (email.trim() !== '') {
            setShowModal4(true);
            setEmail('');
        }
    }
    const handleRemoveUser = () => {
        toast.success(`User with email ${email} has been removed.`);
        setShowModal4(false);
    };
    const [userType, setUserType] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const handleClose = () => setShowModal(false);
    function handleSubmitAdd(event) {
        event.preventDefault();
        if (userType.match("student")) { setShowModal(true); }
        else { setShowModal1(true); }
        console.log("success");
        setUserType('');

    }
    function handleConfirmAdd() {
        setShowModal3(true);

    }
    const handleAddUser = () => {
        toast.success(`User with email ${email} has been added.`);
        setShowModal3(false);
    };
    function handleUserTypeChange(event) {
        setUserType(event.target.value);
    }

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
                                                <NavDropdown.Item as={Link} to={`/adminDashboard/${email1}/adminEditInfo`}>Update Informations</NavDropdown.Item>
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

                        <section>
                            {/* <h3 style={{ marginLeft: "47%" ,paddingTop: "50px" }}>Verify User</h3> */}
                            <table>
                                {/* <thead>
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                            </tr>
                            ))}
                        </tbody> */}
                            </table>
                        </section>

                        <section>
                            <h3 style={{ marginLeft: "48%", paddingTop: "50px" }}>Add User</h3>
                            <ToastContainer />
                            <Form onSubmit={handleSubmitAdd} style={{ width: "80%", margin: "auto" }}>
                                <Form.Group controlId="formBasicUserType">
                                    <Form.Label>User Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user type"
                                        value={userType}
                                        required
                                        onChange={handleUserTypeChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{ marginTop: '2rem', width: '200px', marginLeft: '45%', height: '60px' }}>
                                    Add
                                </Button>
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ToastContainer />
                                        <form onSubmit={handleConfirmAdd}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicRegistrationNumber">
                                                <Form.Label>Registration Number</Form.Label>
                                                <Form.Control type="number" placeholder="Enter registration number " value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicClassRoll">
                                                <Form.Label>Class Roll</Form.Label>
                                                <Form.Control type="number" placeholder="Enter class roll" value={classRoll} onChange={(e) => setClassRoll(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicSemester">
                                                <Form.Label>Semester</Form.Label>
                                                <Form.Control type="number" placeholder="Enter semester" value={semester} onChange={(e) => setSemester(e.target.value)} required />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicImage">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control type="file" value={image} required onChange={(e) => setImage(e.target.value)} />
                                            </Form.Group>
                                            <ModalFooter>
                                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type="submit" >
                                                    Confirm
                                                </Button>
                                            </ModalFooter>
                                        </form>
                                    </Modal.Body>


                                </Modal>
                                <Modal show={showModal1} onHide={() => setShowModal1(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new Teacher</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ToastContainer />
                                        <Form onSubmit={handleConfirmAdd}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </Form.Group>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowModal1(false)}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type="submit">
                                                    Confirm
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal.Body>

                                </Modal>
                                <Modal show={showModal3} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want to add the user?</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <p>Click "Yes" to add the user or "No" to cancel.</p>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal3(false)}>
                                            No
                                        </Button>
                                        <Button variant="primary" onClick={handleAddUser}>
                                            Yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form>
                        </section>









                        <section>
                            <h3 style={{ marginLeft: "47%", paddingTop: "50px" }}>Remove User</h3>
                            <ToastContainer />
                            <Form onSubmit={handleSubmitDelete} style={{ width: "80%", margin: "auto" }}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        required
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group >
                                <Button variant="danger" type="submit" style={{ marginTop: "2rem", width: "200px", marginLeft: "45%", height: "60px" }}>
                                    Remove
                                </Button>

                                <Modal show={showModal4} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want to remove the user?</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <p>Click "Yes" to remove the user or "No" to cancel.</p>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal4(false)}>
                                            No
                                        </Button>
                                        <Button variant="primary" onClick={handleRemoveUser}>
                                            Yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form>
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

export default ManageUser;