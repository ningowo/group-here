import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage.js";
import LoginPage from "./Pages/LoginPage.js";
import DetailPage from "./Pages/DetailPage.js";
import NavBar from "./Components/NavBar.js";

function App() {
  return (
    <Router>
      <NavBarGlobal></NavBarGlobal>

      <Switch>
        // to detail pages
        <Route path="/other">
          <AboutPage></AboutPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>

      <footer>Made by Ning & Tiange</footer>
    </Router>
  );
}

export default App;
