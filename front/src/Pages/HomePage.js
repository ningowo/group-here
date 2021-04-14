import React, { useState, useEffect } from "react";
import PostList from "../Components/PostList.js";
import Recommends from "../Components/Recommends.js";

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
      const res = await (await fetch("/getGroups")).json();
      console.log("res from be", res.data);
      setGroups(res.data);
      console.log("after setgroup", groups);
    }
    fetchdata();
    console.log(groups);
  }, [reload]);

  const createGroup = async (event) => {
    event.preventDefault();

    const data = {
      data: { author: username, group_name: groupName },
      colName: "groups",
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

    console.log("reload", reload);
  };

  const renderPost = (groupsInput) => {
    let res = [];

    console.log("groupsInput", groupsInput);

    for (let group of groupsInput ?? []) {
      let groupRep = [];
      groupRep.push(
        <h3 className="groupName" key={group._id}>
          <a href={"/group/" + group.group_name}>{group.group_name}</a>
        </h3>
      );
      for (let post of group.posts ?? []) {
        groupRep.push(
          <div className="postName" key={group._id + post}>
            <a href={"/detail/" + post}>{post}</a>
          </div>
        );
      }
      res.push(groupRep);
    }
    return res;
  };

  console.log("_______", groups);

  return (
    <div className="container main-container">
      <h2>Group List</h2>
      <div className="row">
        <div className="col-8">
          post here
          {
            //<div hidden={true}>{groups}</div>
          }
          {
            // <div><<a id="postTitle" href="/group/initial_group">
            //     h3>Initail Group</h3>
            //   </a>></div>}
          }
          <div>{renderPost(groups)}</div>
        </div>
        <div className="col-4">recommends here</div>
        {/*        <PostList></PostList>
        <Recommends></Recommends>*/}
      </div>
      <div>
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
    </div>
  );
}
