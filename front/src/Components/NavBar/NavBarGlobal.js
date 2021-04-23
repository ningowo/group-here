import React from "react";
import NavUser from "./NavUser.js";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <img
          id="titleIcon"
          src="/titleIcon.png"
          alt="graph appear in title"
        ></img>
        <span>&nbsp;&nbsp;</span>

        <a className="navbar-brand" href="/homepage">
          <h3>Group Here</h3>
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/homepage"
              >
                Home
              </a>
            </li>
          </ul>
        </div>
        <NavUser></NavUser>
      </div>
    </nav>
  );
}
