import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import UserNav from './userNav';
import { useHistory } from 'react-router-dom';

const JobPostingForm = ({ onPostedJob }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
  });
  const history = useHistory();

  const [showError, setShowError] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userId

  useEffect(() => {
    // Access userId from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const userIdValue = storedUser._id;
      setUserId(userIdValue); // Set userId in state
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleJobPost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/post', {
        userId,
        ...jobDetails,
      });

      if (response.data.success) {
        setJobDetails({
          title: '',
          description: '',
          budget: '',
          location: '',
        });

        // Call the callback function to handle the posted job
        if (typeof onPostedJob === 'function') {
          onPostedJob();
        }

        // Show success message
        alert('Job posted successfully!');
        history.push('/userdashboard');
        
      } else {
        console.error('Job posting failed:', response.data.message);
        // Show error message
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during job posting:', error);
      // Show error message
      setShowError(true);
    }
  };

  return (
    <div>
      <UserNav />

      <Form>
        <Form.Group controlId="title">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job title"
            value={jobDetails.title}
            onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter job description"
            value={jobDetails.description}
            onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="budget">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job budget"
            value={jobDetails.budget}
            onChange={(e) => setJobDetails({ ...jobDetails, budget: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job location"
            value={jobDetails.location}
            onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleJobPost}>
          Post Job
        </Button>
      </Form>

      {showError && (
        <Alert variant="danger" className="mt-3">
          Job posting failed. Please try again.
        </Alert>
      )}

      {/* Display userId at the bottom */}
      <p>User ID: {userId}</p>
    </div>
  );
};

export default JobPostingForm;
