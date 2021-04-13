import React from "react";

export default function NavUser() {
  // judge weither login or not
  const username = "";
  if (!username) {
    return (
      <div>
        <ul className="navbar-nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link" href="/toLogin">
              Login
            </a>
          </li>
          <li className="nav-item">|</li>
          <li className="nav-item">
            <a className="nav-link" href="/toSignUp">
              Sign up
            </a>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        {username}&nbsp;
        <a href="/logout">logout</a>
      </div>
    );
  }
}
