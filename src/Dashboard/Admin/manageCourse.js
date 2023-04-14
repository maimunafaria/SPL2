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

export function ManageCourse() {
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

  const [courses, setCourses] = useState([]);

  const handleAddCourse = (event) => {
    event.preventDefault();
    const courseId = event.target.courseId.value;
    const teacherIds = event.target.teacherIds.value.split(',');
    const studentIds = event.target.studentIds.value.split(',');
    const newCourse = {
      courseId: courseId,
      teacherIds: teacherIds,
      studentIds: studentIds
    };
    setCourses([...courses, newCourse]);
    event.target.reset();
  }

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
                  <Navbar.Brand as={Link} to={`/adminDashboard/${email}`}>
                    <img
                      src={logo}
                      height="50"
                      className="d-inline-block align-top"
                      alt="Logo"
                    />
                  </Navbar.Brand>
                  <Nav.Link as={Link} to={`/adminDashboard/${email}`} className="active">Admin Dashboard</Nav.Link>
                  <Navbar.Toggle aria-controls="navbarsExample09" aria-label="Toggle navigation">
                    <span className="ti-align-justify"></span>
                  </Navbar.Toggle>
                  <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                    <Nav className="ml-auto">

                      <NavDropdown title="Settings" id="dropdown02" className="active">
                        <NavDropdown.Item as={Link} to={`/adminDashboard/${email}/adminResetPassword`}>Reset Password</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={`/adminDashboard/${email}/adminEditInfo`}>Update Informations</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to={`/adminDashboard/${email}`} className="active">Back</Nav.Link>
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
            <section style={{ height: "700px", marginTop: "10rem" }} >
              <h1 style={{ marginLeft: "45%" }}>Add Course</h1>
              <Form onSubmit={handleAddCourse} style={{ width: "80%", margin: "auto" }}>
                <Form.Group controlId="formCourseId">
                  <Form.Label>Course ID</Form.Label>
                  <Form.Control type="text" placeholder="Enter course ID" name="courseId" required />
                </Form.Group>
                <Form.Group controlId="formTeacherIds">
                  <Form.Label>Teacher IDs</Form.Label>
                  <Form.Control type="text" placeholder="Enter teacher IDs separated by commas" name="teacherIds" required />
                </Form.Group>
                <Form.Group controlId="formStudentIds">
                  <Form.Label>Student IDs</Form.Label>
                  <Form.Control type="text" placeholder="Enter student IDs separated by commas" name="studentIds" required />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: "2rem", width: "200px", marginLeft: "45%", height: "60px" }}>
                  Add Course
                </Button>
              </Form>
              <ul>
                {courses.map((course, index) => (
                  <li key={index}>
                    Course ID: {course.courseId} | Teacher IDs: {course.teacherIds.join(',')} | Student IDs: {course.studentIds.join(',')}
                  </li>
                ))}
              </ul>


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

export default ManageCourse;