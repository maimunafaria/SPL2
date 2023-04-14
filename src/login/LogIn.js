import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Modal, Form, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.jpg';
import background1 from '../background1.jpg';
import './LogIn.css';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export function LogIn() {
  React.useEffect(() => {
    const AOS = require('aos');
    AOS.init();
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email1, setEmail1] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');



  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:12280/user/login',
      {
        email: email,
        password: password,

      }).then((response) => {
        if (response.data.error)
          toast.error(response.data.error);
        else {
          localStorage.setItem("accessToken", response.data);

          Axios.get("http://localhost:12280/auth/", {
            headers: {
              accessToken: localStorage.getItem("accessToken")

            }
          }).then((response) => {
            if (response.data.error) {
              toast.error("Wrong Email or Password");
            } else {
              if (response.data.userType == "Student") {
                navigate(`/studentDashboard/${response.data.email}`);
              }
              else if (response.data.userType == "Teacher") {
                navigate(`/teacherDashboard/${response.data.email}`);
              }
              else if (response.data.userType == "Director") {
                navigate(`/directorDashboard/${response.data.email}`);
              }
              else if (response.data.userType == "Admin") {
                navigate(`/adminDashboard/${response.data.email}`);
              }

            }
          });
        }
      });
  }
  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);


  const [showModal, setShowModal] = useState(false);
  const handleForgotPassword = () => {

    setShowModal(true);

    console.log('Forgot password clicked');

  };
  const [showModal1, setShowModal1] = useState(false);


  const sendOTP = async (event) => {
    event.preventDefault();
    console.log(email1)
    const res = await Axios.post('http://localhost:12280/user/generate-otp2', { email1 });
    toast.info(res.data.message);
    if (res.data.message == 'Failed to send OTP') { }
    else { setShowModal1(true); }
  };
  const [showModal2, setShowModal2] = useState(false);
  const verifyOTP = async (event) => {

    event.preventDefault();
    const res = await Axios.post('http://localhost:12280/user/verify-otp2', { email1, otp });
    if (res.data.message == 'Invalid OTP') {
      toast.error(res.data.message);
    }
    else {
      setShowModal2(true);
      toast.info(res.data.message);
    }


  };

  const handleForgotPasswordConfirm = () => {
    console.log("hi")
    Axios.post('http://localhost:12280/user/change-pass', {
      email1: email1,
      newPassword: newPassword
    }).then((response) => {

      toast.success(response.data.message)
    }
    )
  };
  return (
    <div className="page" style={{ backgroundImage: `url(${background1})` }} >


      <section class="okay">
        <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
          <Container>
            <Nav.Link href="/">
              <img
                src={logo}
                height="50"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Nav.Link>

            <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
              <Nav className="ml-auto">
                <Nav.Link href="/" className="active">Home</Nav.Link>
                <NavDropdown title="Sign Up" id="dropdown02" className="active">
                  <NavDropdown.Item href="/teacher">Teacher</NavDropdown.Item>
                  <NavDropdown.Item href="/student">Student</NavDropdown.Item>
                  <NavDropdown.Item href="/director">Director</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
      <Container className="login-container">
        <ToastContainer />
        <Form className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicForgotPassword">
            <Form.Text className="forgot-password" onClick={handleForgotPassword}>
              Forgot password?
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button" onClick={(e) => { handleSubmit(e) }}>
            Log In
          </Button>
        </Form>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer />
          <Form >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email1} onChange={(e) => setEmail1(e.target.value)} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={sendOTP}>
                Send OTP
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
      <Modal show={showModal1} onHide={() => setShowModal1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer />
          <Form >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <Form.Text className="text-muted">
                Never share your OTP with anyone else.
              </Form.Text>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal1(false)}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={verifyOTP}>
                Verify OTP
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
      <Modal show={showModal2} onHide={() => setShowModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer />
          <Form >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal2(false)}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={() => handleForgotPasswordConfirm()}>
                Reset Password
              </Button>

            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
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
  );
}

export default LogIn;