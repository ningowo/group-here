import React, { useState, useEffect } from "react";

export default function LoginPage() {
  return (
    <div className="userPage">
      <form className="bg-light" action="/signUp" method="POST">
        <h4>Sign up</h4>
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
          <label className="form-label">Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            name="re-enter-password"
            id="re-enter-password"
            placeholder="Enter your password again"
            required
          />
        </div>
        <div className="d-grid gap-2 btnDiv">
          <button className="btn btn-outline-primary" type="submit">
            submit
          </button>
        </div>
        Already have an account? <a href="/toLogin">Login Here</a>
      </form>
    </div>
  );
}
