import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import background1 from './background1.jpg';
import profile from './profile.jpg';
import notice from './notice.jpg';
import notification from './notification.jpg';
import report from './report.jpg';
import viewLiveProgress from './viewLiveProgress.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './studentDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export function StudentDashboard() {
    const [showAlert, setShowAlert] = useState(false);

    function handleLogout() {
        setShowAlert(true);
    };

    function handleConfirmLogout(confirm) {
        setShowAlert(false);
        if (confirm) {
            // Perform logout logic here
            console.log("Logging out...");

            window.location.href = "/";
        }
    };

    const { email } = useParams();
    const [studentInformation, setStudentInformation] = useState({});
    useEffect(() => {
        Axios.get(`http://localhost:12280/student/${email}`).then((response) => {
            setStudentInformation(response.data);
            // setFileName(response.data.photo);
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
        authenticate("Student");
    }, []);

    return (
        <>
            {
                authState && (
                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >


                        <section class="okay">
                            <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
                                <Container>
                                    <Navbar.Brand as={Link} to={`/studentDashboard/${email}`}>
                                        <img
                                            src={logo}
                                            height="50"
                                            className="d-inline-block align-top"
                                            alt="Logo"
                                        />
                                    </Navbar.Brand>
                                    <Nav.Link as={Link} to={`/studentDashboard/${email}`} className="active">Student Dashboard</Nav.Link>

                                    <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                                        <Nav className="ml-auto">

                                            <NavDropdown title="Settings" id="dropdown02" className="active">
                                                <NavDropdown.Item as={Link} to={`/studentDashboard/${email}/studentResetPassword`}>Reset Password</NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to={`/studentDashboard/${email}/studentEditInfo`}>Update Informations</NavDropdown.Item>
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
                                                    src={`http://localhost:12280/studentImages/${studentInformation.photo}`}
                                                    class="img-fluid w-100 d-block"
                                                    alt="Logo"
                                                />
                                                <div class="overlay-box">
                                                    <div class="overlay-inner">
                                                        <Link class="overlay-content" to={`/studentDashboard/${email}/profile`}>
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
                                                                src={notice}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" href="portfolio-single.html">
                                                                        <h5 class="mb-0 ">Notice Management</h5>
                                                                        <p>Receive Notice</p>
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
                                                                src={report}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" href="portfolio-single.html">
                                                                        <h5 class="mb-0">Reports</h5>
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

export default StudentDashboard;