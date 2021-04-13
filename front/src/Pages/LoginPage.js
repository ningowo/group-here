import React, { useState, useEffect } from "react";
import App from "../App";

export default function LoginPage() {
  return (
    <div className="userPage">
      <form className="bg-light" action="/login" method="POST">
        <h4>Login</h4>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter your username"
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
            required
          />
        </div>
        <div className="d-grid gap-2 btnDiv">
          <button className="btn btn-outline-primary" type="submit">
            submit
          </button>
        </div>
        New to Group Here? <a href="/toSignUp">create an account</a>
      </form>
    </div>
  );
}
