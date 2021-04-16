import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const { query } = props;

  useEffect(() => {
    const fetchPostList = async () => {
      const data = { colName: "posts", query: query };
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
      setPosts(res.data);
      console.log("after setgroup", posts);
    };
    fetchPostList();
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
      <div class="postDiv" key={post._id}>
        <div class="likes">{post.likes} likes</div>
        <div class="postContentDiv">
          <h3>
            <a href={"/detail/" + post.post_name}>{post.post_name}</a>
          </h3>
          <div class="postOverview">
            <p>{post.content}</p>
          </div>
          <div class="source">
            <span class="groupName">
              From
              <a href={"/group/" + post.group}>{post.group}</a>
            </span>
            <span class="create_time">{post.create_time}</span>
          </div>
        </div>
        <br></br>
      </div>
    ));
  };

  return <div className="posts">{renderPosts()}</div>;
};

PostList.propTypes = {
  query: PropTypes.object.isRequired,
};

export default PostList;
