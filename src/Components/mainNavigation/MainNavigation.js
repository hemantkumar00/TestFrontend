import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";
import { toast } from "react-toastify";
import { API } from "../../API";

const MainNavigation = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useGlobalState();

  const isSessionExpired = (expirationDate) => {
    const now = new Date();
    const expiration = new Date(expirationDate);
    return now > expiration;
  };

  // const clearUserData = () => {
  //   setUserData(null); // Clear user data
  // };

  const logoutHandler = async () => {
    try {
      // Perform the sign-out action (optional)
      await axios.get(`${API}/signout`, {
        withCredentials: true,
      });

      toast.success(`See you soon again`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // clearUserData();
      setUserData(null);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      // console.error(error);
      toast.error(`An error occurred while signing out`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // Even if sign-out fails, still clear user data
      // clearUserData();
      setUserData(null);
      navigate("/"); // Redirect to the home page
    }
  };

  useEffect(() => {
    if (userData && isSessionExpired(userData.expiresAt)) {
      toast.info(`Your session has expired. Please sign in again.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      // clearUserData();
      setUserData(null);
      navigate("/signin");
    }
  }, [userData, navigate, setUserData]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#E1DDE9" }}
    >
      <div className="container container-fluid">
        <Link className="navbar-brand" to={userData ? "/profile" : "/"}>
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/testseries">
                TestSeries
              </Link>
            </li>

            {userData !== null && userData.role === "Admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  DashBoard
                </Link>
              </li>
            )}
            {userData !== null && userData.role === "User" && (
              <li className="nav-item">
                <Link className="nav-link" to="/enrolled-testseries">
                  Enrolled TestSeries
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                About US
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {userData !== null ? (
              <button
                onClick={logoutHandler}
                className="btn btn-outline-danger mx-1"
                type="button"
              >
                SignOut
              </button>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  aria-current="page"
                  to="/signup"
                >
                  SignUp
                </Link>
                <Link
                  className="btn btn-outline-primary mx-1"
                  aria-current="page"
                  to="/signin"
                >
                  SignIn
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
