// LawyersList.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LawyerCard from './LawyerCard';

const LawyersList = ({ lawyers }) => {
  return (
    <Row className="mt-3">
      {lawyers.map((lawyer) => (
        <Col key={lawyer.id} sm={12} md={6} lg={4} xl={3}>
          <LawyerCard lawyer={lawyer} />
        </Col>
      ))}
    </Row>
  );
};

export default LawyersList;
