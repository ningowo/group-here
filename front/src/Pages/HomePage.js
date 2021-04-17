import React, { useState, useEffect } from "react";
import PostList from "../Components/PostList.js";
import GroupList from "../Components/GroupList.js";

export default function HomePage() {
  const [loginStat, setLoginState] = useState(false);
  const [validGroupName, isValidGroupName] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
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
      // 我这里getGroups是404
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
    // 这里不知道为什么，create返回的是{  "data": null, "message": "query error"}， 添加失败
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

  // 这个模块用PostList，这里的可以挪过去了。我基本都写好了直接用就可以
  //然后我的想法是选出点赞数最多的post按顺序放在homepage左侧，grouplist在右边
  // 还有数据库的post里加个点赞数
  // const renderPost = (groupsInput) => {
  //   let res = [];

  //   console.log("groupsInput", groupsInput);

  //   for (let group of groupsInput ?? []) {
  //     let groupRep = [];
  //     groupRep.push(
  //       <h3 className="groupName card" key={group._id}>
  //         <a href={"/group/" + group.group_name}>{group.group_name}</a>
  //       </h3>
  //     );
  //     for (let post of group.posts ?? []) {
  //       groupRep.push(
  //         <div className="postName card" key={group._id + post}>
  //           <a href={"/detail/" + post}>{post}</a>
  //         </div>
  //       );
  //     }
  //     res.push(groupRep);
  //   }
  //   return res;
  // };

  return (
    <div className="container main-container">
      <h4> Explore</h4>
      <br></br>
      <div className="row">
        <div className="col-8">
          {/*<PostList posts={posts}></PostList> */}
          {/*//这里我之后再改改 按点赞数*/}
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
        <div className="col-4">
          <GroupList username={username} query={{}}></GroupList>
        </div>
      </div>
    </div>
  );
}
