import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
  <h5>Follow Us</h5>
  <div>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
