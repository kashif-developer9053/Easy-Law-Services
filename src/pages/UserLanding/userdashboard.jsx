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

  // Add the Axios interceptor here
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.data && response.data.success === false) {
          // Redirect to the sign-in page if success is false
          history.push('/signin');
        }

        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [history]);
  

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
    const token = localStorage.getItem('token');
  
    console.log('User Data from LocalStorage:', userData);
    console.log('Token from LocalStorage:', token);
  
    if (userData && token) {
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
