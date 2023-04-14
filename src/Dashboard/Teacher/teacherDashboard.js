import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Modal, Form, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import background1 from './background1.jpg';
import profile from './profile.jpg';
import notification from './notification.jpg';
import manualAttendance from './manualAttendance.jpg';
import startAClass from './startAClass.jpg';
import viewLiveProgress from './viewLiveProgress.jpg';
import report from './report.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './teacherDashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MyModal from './Modal.js'

export function TeacherDashboard() {
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
    const [showModal, setShowModal] = useState(false);
    const [courseCode, setCourseCode] = useState('');

    const [courseCodeManual, setCourseCodeManual] = useState('');
    const [emailManual, setEmailManual] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);


    const handleStart = () => {
        console.log(`Starting class with course code ${courseCode}`);
        setShowModal(false);
        setCourseCode('');
        toast.success('Class has been Started');
        setShowModal2(true);


    }
    const handleCloseModal = () => {
        setShowModal2(false);
    };



    const handleManualAttendance = () => {
        console.log(`Starting class with course code ${courseCode}`);
        setShowModal1(false);
        setCourseCodeManual('');
        setEmailManual('');
        toast.success('Attendance has been taken');
    }

    const [authState, setAuthState] = useState(false);
    const authenticate = (userType) => {
        axios.get("http://localhost:12280/auth/", {
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
        authenticate("Teacher");
    }, []);

    const [teacherInformation, setTeacherInformation] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:12280/teacher/${email}`).then((response) => {
            setTeacherInformation(response.data);
            console.log(response.data);
        });
    }, [])


    return (
        <>
            {
                authState && (

                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >


                        <section class="okay">
                            <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
                                <Container>
                                    <Navbar.Brand as={Link} to={`/teacherDashboard/${email}`}>
                                        <img
                                            src={logo}
                                            height="50"
                                            className="d-inline-block align-top"
                                            alt="Logo"
                                        />
                                    </Navbar.Brand>
                                    <Nav.Link as={Link} to={`/teacherDashboard/${email}`} className="active">Teacher Dashboard</Nav.Link>
                                    <Navbar.Toggle aria-controls="navbarsExample09" aria-label="Toggle navigation">
                                        <span className="ti-align-justify"></span>
                                    </Navbar.Toggle>
                                    <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                                        <Nav className="ml-auto">

                                            <NavDropdown title="Settings" id="dropdown02" className="active">
                                                <NavDropdown.Item as={Link} to={`/teacherDashboard/${email}/teacherResetPassword`}>Reset Password</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to={`/teacherDashboard/${email}/teacherEditInfo`}>Update Informations</NavDropdown.Item>
                                            </NavDropdown>
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
                        <div class="profileclass"> <h5> Profile </h5>
                            <section>
                                <div class="row shuffle-wrapper portfolio-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div class="col-lg-4 col-6 mb-0 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                        <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                <img
                                                    //  src={profile}
                                                    src={`http://localhost:12280/teacherImages/${teacherInformation.photo}`}
                                                    class="img-fluid w-100 d-block"
                                                    alt="Logo"
                                                />
                                                <div class="overlay-box">
                                                    <div class="overlay-inner">
                                                        <Link class="overlay-content" to={`/teacherDashboard/${email}/profile`}>
                                                            <h5 class="mb-0 ">View Profile</h5>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="roleclass"> <h5> Roles </h5>
                            <section class=" portfolio "  >
                                <Carousel>
                                    <Carousel.Item className="banner-carousel-item">
                                        <div class="container">


                                            <div class="row shuffle-wrapper portfolio-gallery">
                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >

                                                            <img
                                                                src={report}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" href="portfolio-single.html">
                                                                        <h5 class="mb-0 ">Reports</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;branding&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={startAClass}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" onClick={() => setShowModal(true)}>
                                                                        <h5 class="mb-0">Start A Class</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;illustration&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={notification}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" href="portfolio-single.html">
                                                                        <h5 class="mb-0">Notifications</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="container">


                                            <div class="row shuffle-wrapper portfolio-gallery">
                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={manualAttendance}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" onClick={() => setShowModal1(true)}>
                                                                        <h5 class="mb-0 ">Manual Attendance</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={viewLiveProgress}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" href="portfolio-single.html">
                                                                        <h5 class="mb-0 ">View Live Progress</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                                <ToastContainer />
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Start a Class</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="formCourseCode">
                                                <Form.Label>Course Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter course code" value={courseCode} required onChange={(e) => setCourseCode(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button variant="primary" onClick={() => handleStart()} >Start</Button>

                                    </Modal.Footer>
                                </Modal>
                                <MyModal show={showModal2} onHide={handleCloseModal} />

                                <Modal show={showModal1} onHide={() => setShowModal1(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Manual Attendance</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="formCourseCodeManual">
                                                <Form.Label>Course Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter course code" value={courseCodeManual} required onChange={(e) => setCourseCodeManual(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group controlId="formEmailManual">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" placeholder="Enter email" value={emailManual} required onChange={(e) => setEmailManual(e.target.value)} />
                                            </Form.Group>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal1(false)}>Cancel</Button>
                                        <Button variant="primary" onClick={handleManualAttendance} disabled={!courseCodeManual} >Done</Button>
                                    </Modal.Footer>
                                </Modal>
                            </section>
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

export default TeacherDashboard;