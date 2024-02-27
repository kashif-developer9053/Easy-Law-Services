// JobPosting.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const JobPosting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');

  const handleJobPost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/post', {
        title,
        description,
        budget,
        location,
      });

      if (response.data.success) {
        // Job posted successfully, you may redirect the user or show a success message
        console.log('Job posted successfully');
      } else {
        console.error('Error posting job:', response.data.error);
      }
    } catch (error) {
      console.error('Error during job posting:', error.message);
    }
  };

  return (
    <Container>
      <h2>Post a Job</h2>
      <Form>
        <Form.Group controlId="formJobTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formJobDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formJobBudget">
          <Form.Label>Budget</Form.Label>
          <Form.Control type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formJobLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleJobPost}>
          Post Job
        </Button>
      </Form>
    </Container>
  );
};

export default JobPosting;
