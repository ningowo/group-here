import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../Components/CommentList.js";

export default function DetailPage() {
  // const [isFetching, setFetching] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState([]);
  const [reload, setReload] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = { colName: "posts", query: { post_name: params.id } };
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
    fetchData();
  }, [reload]);

  const createComment = async (event) => {
    event.preventDefault();
    // TODO: impelement create comment
  };

  return (
    <div className="DetailPage">
      {/*左边是具体的post内容和评论*/}
      <div className="col-8 postDetailDiv">
        <div className="postName">{post.post_name}</div>
        <div className="author">{post.author}</div>
        <div className="postContent">{post.content}</div>
        <br></br>
        <div className="postComments">
          <CommentList query={{ post: post.post_name }}></CommentList>
        </div>
        <form className="bg-light" onSubmit={createComment} hidden={true}>
          <h4>Create Comment</h4>
          <div className="form-group">
            <label className="form-label">commnet</label>
            <input
              type="text"
              className="form-control"
              name="group_name"
              placeholder="Enter your groupName"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              id="username"
            />
          </div>
          <div className="d-grid gap-2 btnDiv">
            <button
              className="btn btn-outline-primary"
              type="submit"
              hidden={!loginStat}
            >
              submit
            </button>
            <a href="/toLogin" hidden={loginStat}>
              Login to create a comment
            </a>
          </div>
        </form>
      </div>
      <div className="col-4">{/*右边是加入小组的选项*/}</div>
    </div>
  );
}
