import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../Components/CommentList.js";

export default function DetailPage() {
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState([]);
  const [reload, setReload] = useState(0);
  // const [reloadComment, setReloadComment] = useState
  const [loginStat, setLoginState] = useState(false);
  const [username, setUsername] = useState("");

  const params = useParams();

  console.log("params", params);

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

  const fetchData = async () => {
    const data = {
      colName: "posts",
      query: { post_name: decodeURIComponent(params.id) },
    };
    const resRaw = await fetch("/query", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await resRaw.json();
    console.log("fetch post detail for detailpage from be", res);
    setPost(res.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createComment = async (event) => {
    event.preventDefault();
    const data = {
      colName: "comments",
      data: {
        post: post.post_name,
        author: username,
        content: newComment,
        create_date: new Date(),
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

    // fetchData();
    setReload(reload + 1);
    alert("Commented!");
    setNewComment("");
  };

  return (
    <main className="DetailPage">
      <div className="col-8 postDetailDiv">
        <div className="postInfo">
          <h1 className="postName">{post.post_name}</h1>
          <div className="author">By {post.author}</div>
        </div>
        <p></p>
        <div className="postContent">{post.content}</div>
        <hr></hr>
        <div className="postComments">
          <CommentList
            query={{ post: post.post_name }}
            reload={reload}
          ></CommentList>
        </div>
        <p className="message" hidden={loginStat}>
          <a href="/toLogin">Login</a>
          &nbsp;to create a comment
        </p>

        <form className="" onSubmit={createComment} hidden={!loginStat}>
          <h2>Create Comment</h2>
          <div className="form-group">
            <label className="form-label">comment</label>
            <input
              type="text"
              className="form-control"
              name="newComment"
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              id="username"
            />
          </div>
          <div className="d-grid gap-2 btnDiv">
            <button className="btn btn-outline-primary" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
      <div className="col-4">{/*右边是加入小组的选项*/}</div>
    </main>
  );
}
