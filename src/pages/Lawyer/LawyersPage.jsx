

  import React, { useState } from 'react';
import { Card, Button, FormControl, InputGroup } from 'react-bootstrap';

const LawyersPage = ({ searchTerm }) => {
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchTermLocal, setSearchTermLocal] = useState('');

  const dummyLawyersData = [
    {
      id: 1,
      name: 'John Doe',
      category: 'Family Lawyer',
      rate: 25,
      reviews: 15,
      image: '/img/lawyers/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      category: 'Criminal Lawyer',
      rate: 30,
      reviews: 20,
      image: '/img/lawyers/2.png',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      category: 'Civil Lawyer',
      rate: 20,
      reviews: 10,
      image: '/img/lawyers/3.png',
    },
    {
        id: 4,
        name: 'John Doe',
        category: 'Family Lawyer',
        rate: 25,
        reviews: 15,
        image: '/img/lawyers/1.jpg',
      },
      {
        id: 5,
        name: 'Jane Smith',
        category: 'Criminal Lawyer',
        rate: 30,
        reviews: 20,
        image: '/img/lawyers/2.png',
      },
      {
        id: 6,
        name: 'Alice Johnson',
        category: 'Civil Lawyer',
        rate: 20,
        reviews: 10,
        image: '/img/lawyers/3.png',
      },
    // Add more lawyers as needed
  ];

  const filterLawyers = () => {
    const lowerSearchTerm = searchTermLocal.toLowerCase();
    const filteredResults = dummyLawyersData.filter(
      (lawyer) =>
        lawyer.name.toLowerCase().includes(lowerSearchTerm) ||
        lawyer.category.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredLawyers(filteredResults);
  };

  const handleSearch = () => {
    setSearchTermLocal(searchTerm);
    filterLawyers();
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for lawyers..."
          aria-label="Search"
          value={searchTermLocal}
          onChange={(e) => setSearchTermLocal(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {(searchTermLocal ? filteredLawyers : dummyLawyersData).map((lawyer) => (
          <div key={lawyer.id} className="col">
            <Card>
              <Card.Img variant="top" src={lawyer.image} alt={lawyer.name} />
              <Card.Body>
                <Card.Title>{lawyer.name}</Card.Title>
                <Card.Text>Category: {lawyer.category}</Card.Text>
                <Card.Text>Rate: ${lawyer.rate}</Card.Text>
                <Card.Text>Reviews: {lawyer.reviews}</Card.Text>
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyersPage;
