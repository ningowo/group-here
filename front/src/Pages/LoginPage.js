import React, { useState, useEffect } from "react";

export default function LoginPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await (await fetch("/getUser")).json();

      console.log("Got user", res);
      setUser(res.user);
    };

    console.log("Checking user");
    checkUser();
  }, []);

  return (
    <div class="userPage">
      <form className="bg-light" action="/login" method="post">
        <h4>Login</h4>
        <div className="form-group">
          <label class="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter your username"
            required
            id="username"
          />
          <label class="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="d-grid gap-2 btnDiv">
          <button class="btn btn-outline-primary" type="submit">
            submit
          </button>
        </div>
        New to Group Here? <a href="/toSignUp">create an account</a>
      </form>
    </div>
  );
}
