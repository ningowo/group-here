import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const query = props.query;
  const limit = props.limit ? props.limit : 0;
  const [postPage, setPostPage] = useState(0);
  const postPerPage = 40;

  useEffect(() => {
    const fetchPostList = async () => {
      const data = { colName: "posts", query: query, limit: limit };
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
      setPosts(res.data);
    };
    fetchPostList();
  }, [query]);

  console.log("props in postlist", query);

  const renderPosts = (postsInput) => {
    return postsInput ? (
      postsInput
        .slice(postPage * postPerPage, (postPage + 1) * postPerPage)
        .map((post) => (
          <div className="postDiv" key={post._id}>
            <div className="likes">
              <span>❤</span>
              {/*<span>{post.likes} likes</span>*/}
            </div>
            <div className="postContentDiv">
              <h5>
                <a href={"/detail/" + post.post_name}>{post.post_name}</a>
              </h5>
              <div className="postOverview">
                <p>{post.content}</p>
              </div>
              <div className="source">
                <span className="groupName">
                  From &nbsp;
                  <a href={"/group/" + post.group}>{post.group}</a>
                </span>
                {/*<span class="create_time"> {post.create_time}</span>*/}
              </div>
            </div>
          </div>
        ))
    ) : (
      <div></div>
    );
  };

  if (renderPosts() === <div></div>)
    return (
      <div>
        <p>
          <a href="/toLogin">Login</a> to create a post!
        </p>
      </div>
    );
  else
    return (
      <div className="container">
        <div className="posts">{renderPosts(posts)}</div>
        <span className="pageBar">
          page{"   "}
          {[...Array(Math.ceil(posts.length / postPerPage)).keys()].map((v) =>
            v === postPage ? (
              <div
                className="pageClickDivSelect"
                onClick={(event) => setPostPage(v)}
              >
                {v}
              </div>
            ) : (
              <div className="pageClickDiv" onClick={(event) => setPostPage(v)}>
                {v}
              </div>
            )
          )}
        </span>
      </div>
    );
};

PostList.propTypes = {
  query: PropTypes.object.isRequired,
  limit: PropTypes.number,
};

export default PostList;
