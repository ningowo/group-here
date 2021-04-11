import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage.js";
import SignUpPage from "./Pages/SignUpPage.js";
import HomePage from "./Pages/HomePage.js";
//import DetailPage from "./Pages/DetailPage.js";

import NavBarGlobal from "./Components/NavBarGlobal.js";

function App() {
  // to store username as session

  return (
    <Router>
      <NavBarGlobal></NavBarGlobal>

      <Switch>
        <Route path="/toLogin">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/toSignUp">
          <SignUpPage></SignUpPage>
        </Route>
        <Route path="/">
          <HomePage></HomePage>
        </Route>

        {/*         // to detail pages
        <Route path="/detail/{}">
          <DetailPage postName=""></DetailPage>
        </Route>*/}
      </Switch>

      <footer>Made by Ning & Tiange</footer>
    </Router>
  );
}

export default App;
