import React from "react";

export default function NavUser() {
  // judge weither login or not
  const username = "";
  if (!username) {
    return (
      <div>
        <ul className="navbar-nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link" href="/toLogin">
              Login
            </a>
          </li>
          <li class="nav-item">|</li>
          <li className="nav-item">
            <a class="nav-link" href="/toSignUp">
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
