import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  // Assuming you have obtained the user ID from the server response
const handleSignIn = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/login', {
      email: email,
      password: password,
    });

    if (response.data.success) {
      const { _id, firstName, lastName } = response.data.user;

      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify({ _id, firstName, lastName }));

      history.push('/userdashboard');
    } else {
      setShowError(true);
      console.error('Sign-in failed. Incorrect email or password.');
    }
  } catch (error) {
    setShowError(true);
    console.error('Error during sign-in:', error);
  }
};


  return (
    <Container className="container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="form-container">
          <h2 className="form-title">Client Sign In</h2>
          <Form>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="submit-btn" onClick={handleSignIn}>
              Sign In
            </Button>
            {showError && (
              <Alert variant="danger" className="mt-3">
                Incorrect email or password. Please try again.
              </Alert>
            )}
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-end login-btn">
        <Col xs="auto">
          <Link to="/Lawyerlogin" className="text-white text-decoration-none me-3">
            <Button variant="outline-secondary">Login as Lawyer</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
