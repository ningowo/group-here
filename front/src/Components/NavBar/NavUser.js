import React, { useState, useEffect } from "react";

export default function NavUser() {
  // judge weither login or not
  const [loginStat, setLoginState] = useState(false);
  const [username, setUsername] = useState("");
  const [reload, setRelod] = useState(0);

  useEffect(() => {
    async function fetchdata() {
      const res = await (await fetch("/isLogin")).json();
      console.log(res);
      if (!res.username) {
        setLoginState(false);
        setUsername("");
      } else {
        setLoginState(true);
        setUsername(res.username);
      }
    }
    fetchdata();
  }, [reload]);

  const logout = async (event) => {
    event.preventDefault();
    await fetch("/logout");
    document.location.href = "/";

    // setLoginState(false);
    // setUsername("");
    // setRelod(reload + 1);
  };

  if (!loginStat) {
    return (
      <div>
        <ul className="navbar-nav justify-content-end nav-user">
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
        Hi, {username}&nbsp;
        <a href="/logout" onClick={logout}>
          {" "}
          logout
        </a>
      </div>
    );
  }
}
