// LawyerCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const LawyerCard = ({ lawyer }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={lawyer.image} alt={lawyer.name} />
      <Card.Body>
        <Card.Title>{lawyer.name}</Card.Title>
        <Card.Text>
          <strong>Category:</strong> {lawyer.categories.join(', ')}
        </Card.Text>
        <Button variant="primary">View Profile</Button>
      </Card.Body>
    </Card>
  );
};

export default LawyerCard;
