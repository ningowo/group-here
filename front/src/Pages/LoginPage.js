import React, { useState } from "react";

export default function LoginPage() {
  function handleSubmit() {
    let username;
    // handle login here
  }

  return (
    <div>
      <form className="navbar-form navbar-right" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="please enter your username"
            required
            id="username"
          />
        </div>

        <button type="submit" className="btn">
          login
        </button>
      </form>
      New to Group Here? <a href="/toSignUp">create an account</a>
    </div>
  );
}
