// JobPosting.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const JobPosting = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to signin if user is not authenticated
      history.push('/signin');
    }
  }, [history]);

  const handleJobPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/jobs/create',
        {
          title,
          description,
          budget,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log('Job posted successfully!');
        // Redirect to the user dashboard after posting
        history.push('/userdashboard');
      } else {
        console.error('Error posting job:', response.data.error);
      }
    } catch (error) {
      console.error('Error posting job:', error.message);
    }
  };

  return (
    <Container>
      <h2>Post a Job</h2>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBudget">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleJobPost}>
          Post Job
        </Button>
      </Form>
    </Container>
  );
};

export default JobPosting;
