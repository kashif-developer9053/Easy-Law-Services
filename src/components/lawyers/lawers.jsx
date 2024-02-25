import React, { useState } from "react";
import { Card, Button, Col, Row, Container, Dropdown } from "react-bootstrap";
import "./lawers.css";

const FreelancerCard = ({ name, image, rate, reviews, contact, category }) => (
  <Col lg={4} md={6} xs={12} className="mb-4">
    <Card className="card1">
      <Card.Img variant="top" src={image} alt={`${name}'s profile`} className="img-fluid" />
      <Card.Body>
        <Card.Title className="name">{name}</Card.Title>
        <Card.Text>
          Rate: ${rate}/hr
          <br />
          Category: {Array.isArray(category) ? category.join(", ") : category}
          <br />
          Reviews: {reviews}
        </Card.Text>
        <Button className="button" variant="primary" onClick={() => contact(name)}>
          Contact
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

const Lawyers = () => {
  const allCategories = ["All", "Family Lawyer", "Criminal Lawyer", "Civil Lawyer", "Property Lawyer"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const freelancers = [
    {
      id: 1,
      name: "Advocate Iftikhar Ahmed Tano",
      image: "/img/lawyers/1.jpg",
      categories: ["Family Lawyer"],
      rate: 25,
      reviews: 15,
    },
    {
      id: 2,
      name: "Advocate Razmak Ali",
      image: "/img/lawyers/2.png",
      categories: ["Criminal Lawyer"],
      rate: 30,
      reviews: 20,
    },
    {
      id: 3,
      name: "Advocate Kashif Ali khan Jadoon",
      image: "/img/lawyers/3.png",
      categories: ["Civil Lawyer", "Criminal Lawyer"],
      rate: 20,
      reviews: 10,
    },
  ];

  const handleContact = (freelancerName) => {
    alert(`Contact ${freelancerName}`);
    // Implement your contact logic here
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const filteredFreelancers =
    selectedCategory === "All"
      ? freelancers
      : freelancers.filter((freelancer) => {
          return freelancer.categories.includes(selectedCategory);
        });

  return (
    <Container>
      <h1 className="beautiful-heading">Top Lawyers</h1>

      <Dropdown onSelect={(selectedCategory) => handleCategoryChange(selectedCategory)}>
         <span> Find By Category  </span>
        <Dropdown.Toggle variant="primary" id="categoryDropdown">
          {selectedCategory}
         
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {allCategories.map((category) => (
            <Dropdown.Item key={category} eventKey={category}>
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Row className="justify-content-around">
        {filteredFreelancers.map((freelancer) => (
          <FreelancerCard
            key={freelancer.id}
            name={freelancer.name}
            image={freelancer.image}
            rate={freelancer.rate}
            reviews={freelancer.reviews}
            category={freelancer.categories}
            contact={handleContact}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Lawyers;
