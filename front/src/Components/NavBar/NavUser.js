import React from "react";

export default function NavUser() {
  // judge weither login or not

  if (!login) {
    return (
      <div>
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
      </div>
    );
  } else {
    return (
      <div>
        {username}
        <a href="/logout">logout</a>
      </div>
    );
  }
}
