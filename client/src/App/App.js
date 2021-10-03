import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import useRoutes from "../routes";
import useAuth from "../hooks/auth.hook.js"; 
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar.js";

import "./App.scss";

function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token; // check if user logined 
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar/> }
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
