import { AppBar, Container, Grid,  } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { logout } from '../../logout/authUtils';

const UserNav = ({ userFirstName }) => {

  const history = useHistory();

 

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      history.push("/signin");
    }
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
        <Container maxWidth="lg">
          <Grid
            container
            alignItems="center"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Link to="/">
                <img
                  className="logo"
                  src={process.env.PUBLIC_URL + "/img/logo/logo.png"}
                  alt="JamTalent Logo"
                />
              </Link>
            </Grid>
            <Grid item xs>
              <div
                className="items d-flex align-items-center"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Link to="/Lawyer" className="text-black text-decoration-none me-3">
                  <h5 className="mb-0">Find A Lawyer</h5>
                </Link>
                <Link to="/legal" className="text-black text-decoration-none me-3">
                  <h5 className="mb-0">Legal Resources</h5>
                </Link>
                <Link to="/user" className="text-black text-decoration-none me-3">
                  <h5 className="mb-0">Marketplace</h5>
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
                {/* Display user's first name if available */}
                {userFirstName && (
                  <div className="text-black me-3">
                    {userFirstName}
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
  
};

export default UserNav;
