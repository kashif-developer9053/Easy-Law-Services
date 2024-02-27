import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter as Router, useLocation, matchPath } from "react-router-dom";
import Error404 from "pages/Error404/Error404";
import BottomNav from "components/NavBars/BottomNav";
import Signin from "pages/RegistrationPage/Signin";
import LawyerLogin from "pages/RegistrationPage/lawyerlogin";
// import Messages from "pages/Message/Messages";
import Userdashboard from "pages/UserLanding/userdashboard";
import Jobposting from "pages/UserLanding/JobPosting";
import Nav from "components/NavBars/nav";
import MultiStepForm from "pages/RegistrationPage/MultiStepForm";
import FreelancerFeed from "pages/Feeds/Freelancer/FreelancerFeed";
// import ProfileSettings from "pages/ProfilePage/Freelancer/Settings";
// import MyProposal from "pages/ProfilePage/Freelancer/MyProposal";
// import Notifications from "pages/Notification/Notifications";
// import Admin from "pages/Admin";
import Home from "pages/Home/Home";
import Legal from "pages/LegalResource/Legal";
// import FreelancerProfile from "pages/ProfilePage/Freelancer/FreelancerProfile";

import RegistrationUser from "pages/UserLanding/RegisterUser";
import Search from "pages/Search/Search";
import LawyersPage from "pages/Lawyer/LawyersPage";

const RouteWithSubRoutes = (route) => {
  const location = useLocation();

  function matchLoc(pathName) {
    return matchPath(location.pathname, {
      path: pathName,
      exact: false,
      strict: false,
    });
  }

  const excludeList = [matchLoc("/admin"), matchLoc("/user")];
  const isPathActive = excludeList.some(function (v) {
    return v !== null;
  });

  return (
    <Route
      path={route.path}
      exact={route.exact}
      children={
        <>
          {route.path === '/' && <Nav />}
          {route.path === '/search' && <Nav />}
          {route.path === '/legal' && <Nav />}
          {route.path === '/UserRegister' && <Nav />}
          {route.path === '/lawyer' && <Nav />}
          {route.path === '/user' && <Nav />}
          {route.path === '/Signin' && <Nav />}
          {route.path === '/Lawyerlogin' && <Nav />}


          <div style={{ padding: "0", margin: "0" }} as="main" fluid={`${isPathActive ? "xs" : "lg"}`} className={`pb-3 ${isPathActive ? "my-0 px-3" : "my-3 my-lg-4 px-0 px-md-3"}`}>
            <route.component routes={route.routes} />
          </div>
          {!isPathActive && <BottomNav />}
        </>
      }
    />
  );
};

const AppRoutes = () => {
  const routes = [
    
    { path: "/userdashboard", exact: true, component: Userdashboard },
    { path: "/jobPosting", exact: true, component: Jobposting },
    { path: "/", exact: true, component: Home },
    { path: "/user", exact: true, component: FreelancerFeed },
    { path: "/lawyer", exact: true, component: LawyersPage },
    { path: "/legal", exact: true, component: Legal },
    { path: "/Signin", exact: true, component: Signin },
    { path: "/Lawyerlogin", exact: true, component: LawyerLogin },
    // { path: "/admin", component: Admin },
    { path: "/register", exact: true, component: MultiStepForm },
    // { path: "/profile", exact: true, component: FreelancerProfile },
    // { path: "/profile/settings", component: ProfileSettings },
    // { path: "/profile/myProposal", component: MyProposal },
    // { path: "/notifications", component: Notifications },
    // { path: "/messages", exact: true, component: Messages },
    { path: "/UserRegister", exact: true, component: RegistrationUser },
    // { path: "/messages/:roomname/:username", component: Messages },
    { path: "/search",exact: true, component: Search },

  ];
  
  return (
    <Router>
      <Suspense fallback={<h1>Loading…</h1>}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
          <Route component={Error404} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
