import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../Components/PostList.js";

// 这个不能删， 这里面用PostList Componnet，主页用GroupList Component，这是显示group详情de页面，可以把JoinGroup Component也加进来
// 在这个page里再加一个join group的功能
// -- 加了

export default function GroupPage() {
  const [loginStat, setLoginState] = useState(false);
  const [validPostName, isValidPostName] = useState(true);
  const [PostName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [reload, setRelod] = useState(0);

  const params = useParams();

  console.log("groupPage", params);

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
      const data = { colName: "groups", query: { group_name: params.id } };
      const resRaw = await fetch("/query", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await resRaw.json();
      console.log("res from be", res.data);

      setGroup(res.data[0]);
      // console.log("after set group in group page", group);
    }
    fetchdata();
    // console.log(group);
  }, [reload]);

  useEffect(() => {
    setGroupName(group.group_name);
  }, [group]);

  const createPost = async (event) => {
    event.preventDefault();
    // TODO: implement create post
  };

  console.log("after set group in group page before return", group);

  return (
    <div>
      <h2>{params.id}</h2>
      <div className="row">
        <div className="col-8">
          {/*posts在这里*/}
          <div className="postDiv">
            <PostList query={{ group: groupName }}></PostList>
          </div>
          <form className="bg-light" onSubmit={createPost} hidden={!loginStat}>
            <h4>Create Post</h4>
            <div className="form-group">
              <label className="form-label">Post Name</label>
              <input
                type="text"
                className="form-control"
                name="group_name"
                placeholder="Enter your post name"
                value={PostName}
                onChange={(e) => setPostName(e.target.value)}
                required
                id="username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Post Content</label>
              <textarea
                type="text"
                className="form-control"
                name="group_name"
                placeholder="Enter your contente"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={9}
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
              hidden={validPostName}
            >
              Invalid post
            </div>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
