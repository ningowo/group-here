import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import App from "../App";

export default function LoginPage() {
  const [validUser, isValidUser] = useState(true);
  const [loginStat, setLoginStat] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("username", username);

    const userInfo = {
      username: username,
      password: password,
    };

    if (password !== password2) {
      isValidUser(false);
      console.log("password not match");
      return;
    }

    const resRaw = await fetch("/signUp", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const res = await resRaw.json();

    console.log("loginStat", res.isLogin);
    console.log("res message", res.message);

    if (!res.isLogin) {
      isValidUser(false);
    } else {
      isValidUser(true);
      setLoginStat(true);
      window.location.reload();
    }
  };

  return loginStat ? (
    <Redirect to="/" />
  ) : (
    <main className="userPage">
      <form className="user-ctl" onSubmit={handleSubmit}>
        <h1>Sign up</h1>
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
          <label className="form-label">Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            name="re-enter-password"
            id="re-enter-password"
            placeholder="Enter your password again"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <div className="d-grid gap-2 btnDiv">
          <button className="btn btn-outline-primary" type="submit">
            submit
          </button>
          <div block className="alert-danger" role="alert" hidden={validUser}>
            Invalid username or password
          </div>
        </div>
        Already have an account? <a href="/toLogin">Login Here</a>
      </form>
    </main>
  );
}
