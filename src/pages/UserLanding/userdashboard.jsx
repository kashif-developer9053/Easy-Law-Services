import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserNav from './userNav';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      const storedToken = Cookies.get('token'); // Fetch token from cookies

      console.log('User Data from LocalStorage:', userData);
      console.log('Token from Cookies:', storedToken);

      if (userData && storedToken) {
        setUser(userData);
        setToken(storedToken);

        const userIdFromStorage = userData.id;
        console.log('User ID:', userIdFromStorage);

        if (userIdFromStorage) {
          setUserId(userIdFromStorage);
        } else {
          console.error('Invalid userId:', userIdFromStorage);
          history.push('/signin');
        }
      } else {
        history.push('/signin');
      }
    };

    fetchData();
  }, [history]);

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
          <p>User Token: {token}</p>

          {/* Job Posting Form */}
          <Button variant="primary" onClick={handleJobPost}>
            Post a Job
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
