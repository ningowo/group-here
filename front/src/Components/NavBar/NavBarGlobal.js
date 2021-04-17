import React from "react";
import NavUser from "./NavUser.js";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      {/*bg-light*/}
      <div className="container-fluid">
        <a className="navbar-brand" href="/homepage">
          Group Here
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
