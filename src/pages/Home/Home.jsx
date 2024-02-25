import React from "react";
import {  Row, Col } from "react-bootstrap";
import Lawyers from "../../components/lawyers/lawers"
// import Footer from "components/Footer";
const Home = () => {
  const heroStyle = {
    backgroundImage: `url('/img/banner.jpg')`, // Replace with your image URL
	backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
	width:"100%",
    color: "white",
    textAlign: "center",
    paddingTop: "150px",
    paddingBottom: "150px",
	marginBottom:"100px",
	
    margin: "0", // Reset margin
  };

  return (
	<>
    <div className="banner" style={heroStyle}>
      <div style={{padding:"0"}}>
        <Row>
          <Col>

         <h1 className="display-4">PAKISTAN LEGAL AWARENESS FACILITIES</h1>
            <p className="lead"> It has the privileged to be the “First website on law in Haripur</p>
            <button className="btn btn-primary btn-lg">Get Started</button>
          </Col>
        </Row>
      </div>
    </div>
	<Lawyers />
	</>
  );
};

export default Home;
