import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";
import "./Navbar.scss";
import "bootstrap/dist/css/bootstrap.css";

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand" style={{marginLeft: "1rem", textTransform: "uppercase"}}>URL shortener</span>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">Create</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" to="/links">Links</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/" onClick={logoutHandler}>Log Out</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;