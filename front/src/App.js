import React from "react";
import "./styles/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage.js";
import SignUpPage from "./Pages/SignUpPage.js";
import HomePage from "./Pages/HomePage.js";
import DetailPage from "./Pages/DetailPage.js";
import GroupPage from "./Pages/GroupPage.js";

import NavBarGlobal from "./Components/NavBar/NavBarGlobal.js";

function App() {
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
        <Route path="/detail/:id" children={<DetailPage />} />
        <Route path="/group/:id" children={<GroupPage />} />
        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
