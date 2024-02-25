// SignIn.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './lawlog.css';

const LawyerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Implement your sign-in logic here
    console.log('Client Signin:', { email, password });
  };

  return (
    <Container className="container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="form-container">
          <h2 className="form-title">LawYer Sign In</h2>
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
          </Form>
        </Col>
      </Row>

     
    </Container>
  );
};

export default LawyerLogin;
