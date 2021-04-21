import React, { useState, useEffect } from "react";
import PostList from "../Components/PostList.js";
import GroupList from "../Components/GroupList.js";

export default function HomePage() {
  const [loginStat, setLoginState] = useState(false);
  const [validGroupName, isValidGroupName] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const [groups, setGroups] = useState([]);
  const [reload, setRelod] = useState(0);

  useEffect(() => {
    async function fetchUser() {
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
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchdata() {
      const data = { colName: "groups", query: {} };
      const res = await (
        await fetch("/query", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();
      console.log("res from be", res.data);
      setGroups(res.data);
      //setGroups((prevGroups) => [...prevGroups, ...res.data]);
      console.log("after setgroup", groups);
    }
    fetchdata();
    console.log(groups);
  }, [reload]);

  const createGroup = async (event) => {
    event.preventDefault();

    const data = {
      colName: "groups",
      data: { author: username, group_name: groupName },
    };
    const resRaw = await fetch("/create", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("create group res", resRaw);

    setGroupName("");

    setRelod(reload + 1);
    alert("Created!");

    console.log("reload", reload);
  };

  return (
    <div className="container main-container">
      <div className="row">
        <div className="col-9">
          <h4>Explore</h4>
          <hr></hr>
          <PostList query={{}}></PostList>
          <p hidden={loginStat}>Login to create your Group!</p>
          <form className="bg-light" onSubmit={createGroup} hidden={!loginStat}>
            <h4>Create Group</h4>
            <div className="form-group">
              <label className="form-label">Group Name</label>
              <input
                type="text"
                className="form-control"
                name="group_name"
                placeholder="Enter your groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                id="username"
              />
            </div>
            <div className="d-grid gap-2 btnDiv">
              <button className="btn btn-outline-primary" type="submit">
                submit
              </button>
            </div>
            <div
              block
              className="alert-danger"
              role="alert"
              hidden={validGroupName}
            >
              Invalid username or password
            </div>
          </form>
        </div>
        <div className="col-3 ">
          <div className="recommendGroups">
            <p>Groups Worth Joining</p>
            <hr></hr>
            <GroupList
              username={username}
              query={{}}
              reload={reload}
            ></GroupList>
          </div>
        </div>
      </div>
    </div>
  );
}
