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
    <div style={{ textAlign: "center", margin: "0 20px" }}>
      <form className="navbar-form navbar-right" action="/login" method="post">
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
