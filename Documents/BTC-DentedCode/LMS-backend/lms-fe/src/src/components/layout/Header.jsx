import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { setUser } from "../../features/user/userSlice";

import lmsLogo from "../../assets/lms-logo-wide.png";
// react icons
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { userLogoutAction } from "../../features/user/userAction";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  // Change
  // const user = { _id: 1 };

  const handleOnLogOut = () => {
    //sign out from browser
    dispatch(userLogoutAction());
    // sign out from server
  };
  return (
    <Navbar expand="md" variant="dark" className="bg-dark">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={lmsLogo} alt="LMS" height={"30px"} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">
              <AiFillHome /> Home
            </Link>
            {user?._id ? (
              <>
                <Link className="nav-link" to="/dashboard">
                  <MdOutlineSpaceDashboard /> Dashboard
                </Link>
                <Link onClick={handleOnLogOut} className="nav-link" to="/">
                  <FaUserCircle /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  {" "}
                  <FaRegCircleUser /> SignIn
                </Link>
                <Link className="nav-link" to="/signup">
                  <TfiWrite /> SignUp
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
