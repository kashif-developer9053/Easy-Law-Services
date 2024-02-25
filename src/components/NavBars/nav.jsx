import { AppBar, Toolbar } from "@material-ui/core";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSearchContext } from '../../pages/Search/SearchContext'; // Adjust the path
import { useState } from "react";
import './nav.css';


const Nav = () => {
  const { handleSearchClick, setSearchTerm } = useSearchContext();
  const [searchTermLocal, setSearchTermLocal] = useState('');

  const onSearch = () => {
    setSearchTerm(searchTermLocal);
    handleSearchClick();
  };


  return (
    <>
      <AppBar
        position="fixed"
        style={{ paddingBottom: "10px" }}
        color="white"
        className="jamNav-top d-none d-md-block bs-400 "
        id="topNav"
      >
        <Container fluid="lg ">
          <Row className="align-items-center">
            <Col>
              <Link to="/">
                <img
                  className="logo"
                  src={process.env.PUBLIC_URL + "/img/logo/logo.png"}
                  alt="JamTalent Logo"
                />
              </Link>
            </Col>
            <Col xs="auto">
              <div className=" items d-flex align-items-center">
                <Link to="/Lawyer" className="text-white text-decoration-none me-3">
                  <h5 className="mb-0">Find A Lawyer</h5>
                </Link>
                <Link to="/legal" className="text-white text-decoration-none me-3">
                  <h5 className="mb-0">Legal Resources</h5>
                </Link>
                <Link to="/user" className="text-white text-decoration-none me-3">
                  <h5 className="mb-0">Marketplace</h5>
                </Link>
                <Link
                  to="/UserRegister"
                  className="text-white text-decoration-none me-3"
                >
                  <h5 className="mb-0">Join</h5>
                </Link>
                
                <Link
                  to="/Signin"
                  className="text-white text-decoration-none me-3"
                >
                  <h5 className="mb-0">Signin</h5>
                </Link>
              </div>
              {/* search input */}
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white">
                  <i className="fas fa-search"></i>
                </div>
                <FormControl
                  style={{ backgroundColor: 'black', color: 'white' }}
                  className="ps-5 py-2 search-input"
                  placeholder="Search..."
                  aria-label="Search..."
                  aria-describedby="Search..."
                  value={searchTermLocal}
                  onChange={(e) => setSearchTermLocal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                />
              
                  
              </div>
            </Col>
          </Row>
        </Container>
      </AppBar>
      <Toolbar className="d-none d-md-block"></Toolbar>
    </>
  );
};

export default Nav;
