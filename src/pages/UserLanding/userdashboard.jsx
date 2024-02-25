import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import UserNav from './userNav';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const history = useHistory();

  const fetchPostedJobs = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/user/${userId}`);
      console.log('Response from server:', response);

      if (response.data.success) {
        setPostedJobs(response.data.jobs);
      } else {
        console.error('Error fetching posted jobs:', response.data.error);
      }
    } catch (error) {
      console.error('Error during job fetching:', error.message);
    }
  }, [userId]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      console.log('User Data:', userData);

      setUser(userData);
      const userIdFromStorage = userData._id;
      console.log('User ID:', userIdFromStorage);
      setUserId(userIdFromStorage);

      // Fetch all jobs for the user
      fetchPostedJobs();
    } else {
      history.push('/signin');
    }
  }, [history, fetchPostedJobs]);

  // Add this outside of the useEffect
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        history.push('/signin');
      }
      return Promise.reject(error);
    }
  );

  const handleJobPost = () => {
    // Redirect to the job posting page
    history.push('/jobPosting');
  };

  return (
    <Container>
      <UserNav userFirstName={user ? user.firstName : ''} />
      <Row>
        <Col>
          <h2>
            Welcome, {user ? user.firstName : ''} (User ID: {userId})
          </h2>

          {/* Job Posting Form */}
          <Button variant="primary" onClick={handleJobPost}>
            Post a Job
          </Button>

          {/* Display Posted Jobs */}
          <h3>All Posted Jobs:</h3>
          <Row>
            {postedJobs.map((job) => (
              <Col key={job._id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <Card.Text>Budget: {job.budget}</Card.Text>
                    <Card.Text>Location: {job.location}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
