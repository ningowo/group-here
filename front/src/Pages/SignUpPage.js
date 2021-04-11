import React, { useState } from "react";

export default function SignUpPage() {
  return (
    <div style={{ textAlign: "center", margin: "0 20px" }}>
      <form className="navbar-form navbar-right" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="username"
            className="form-control"
            placeholder="please enter your username"
            required
            id="username"
          />

          <input
            type="password"
            className="form-control"
            placeholder="please enter your password"
            required
            id="password"
          />
        </div>

        <button type="submit" className="btn">
          login
        </button>
      </form>
      Already have an account? <a href="/toLogin">login</a>
    </div>
  );
}
