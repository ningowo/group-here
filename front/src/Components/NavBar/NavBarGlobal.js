import React, { useContext } from "react";
import NavUser from "./NavUser.js";

export default function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/homepage">
          Club it
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/homepage">
                Home
              </a>
            </li>
          </ul>
        </div>
        <NavUser></NavUser>
        <div>
          {username}
          <a href="/logout">logout</a>
        </div>
        <div className="navbar">
          <p>AwesomeSite</p>
          <p>{username}</p>
        </div>
        );
      </div>
    </nav>
  );
}
