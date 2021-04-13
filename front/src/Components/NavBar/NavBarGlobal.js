import React, { useContext } from "react";
import NavUser from "./NavUser.js";


/*
Nice use of a global navbar. Some conditional rendering could be great here. 
I would also expore scenarios where using a React Router Link might be more useful than using an HTML anchor tag.
*/

export default function NavBar() {
  const username = "ning";
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/homepage">
          Club it
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
