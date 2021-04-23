import React, { useState } from "react";
import { Redirect } from "react-router";

export default function LoginPage() {
  const [validUser, isValidUser] = useState(true);
  const [loginStat, setLoginStat] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("username is ", username);

    const userInfo = {
      username: username,
      password: password,
    };

    const resRaw = await fetch("/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const res = await resRaw.json();

    console.log("res.login", res.isLogin);
    console.log(res.message);

    if (!res.isLogin) {
      isValidUser(false);
    } else {
      isValidUser(true);
      setLoginStat(true);
      window.location.reload();
    }
  };

  return loginStat ? (
    <div>
      {" "}
      <Redirect to="/" />
    </div>
  ) : (
    <main className="userPage">
      <form className=" user-ctl" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            id="username"
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>{" "}
        <div className="d-grid gap-2 btnDiv">
          <button className="btn btn-outline-primary" type="submit">
            submit
          </button>
        </div>
        <div block className="alert-danger" role="alert" hidden={validUser}>
          Invalid username or password
        </div>
        <span className="message">
          New to Group Here?&nbsp;&nbsp;
          <a href="/toSignUp">create an account</a>
        </span>
      </form>
    </main>
  );
}
