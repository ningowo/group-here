import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../Components/PostList.js";
import GroupList from "../Components/GroupList.js";

export default function GroupPage() {
  const [loginStat, setLoginState] = useState(false);
  const [validPostName, isValidPostName] = useState(true);
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState({ group_name: "" });
  const [reload, setRelod] = useState(0);

  const params = useParams();

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
      const data = {
        colName: "groups",
        query: { group_name: decodeURIComponent(params.id) },
      };
      console.log("#######decode data:", data);
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
  }, [reload, params]);

  const createPost = async (event) => {
    event.preventDefault();
    const date = new Date("<YYYY-mm-ddTHH:MM:ss>");

    const data = {
      colName: "posts",
      data: {
        post_name: postName,
        author: username,
        group: group.group_name,
        create_time: date,
        content: postContent,
        comments: [],
      },
    };

    const resRaw = await fetch("/create", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("create post res", resRaw);

    setPostName("");
    setPostContent("");

    setRelod(reload + 1);

    console.log("reload", reload);
  };

  if (!group) {
    return (
      <div className="main-container container">
        <span>Login to create the first post!</span>
        <div>{createPost}</div>
      </div>
    );
  }

  return (
    <main className="main-container container">
      <h1>{decodeURIComponent(params.id)}</h1>
      <div className="row">
        <div className="col-8">
          <PostList query={{ group: group.group_name }}></PostList>

          <form className="" onSubmit={createPost} hidden={!loginStat}>
            <h2>Create Post</h2>
            <div className="form-group">
              <label className="form-label">Post Name</label>
              <input
                type="text"
                className="form-control"
                name="group_name"
                placeholder="Enter your post name"
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
                required
                id="group_name"
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
                id="group_content"
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
        <div className="col-4">
          <div className="recommendGroups">
            <p>Groups Recommended</p>
            <hr></hr>
            <GroupList query={{}}></GroupList>
          </div>
        </div>
      </div>
    </main>
  );
}
