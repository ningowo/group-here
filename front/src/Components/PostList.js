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
        .slice(
          postPage * postPerPage,
          Math.min((postPage + 1) * postPerPage, postsInput.length)
        )
        .map((post) => (
          <div className="postDiv" key={post._id}>
            <div className="likes">
              <svg
                class="Zi Zi--Heart Button-zi"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
              >
                <path
                  d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="postContentDiv">
              <h2>
                <a href={"/detail/" + encodeURIComponent(post.post_name)}>
                  {post.post_name}
                </a>
              </h2>
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

  const range = (start, end) => {
    const tmp = [];
    for (let i = start; i < end; i++) {
      tmp.push(i);
    }
    return tmp;
  };

  if (renderPosts() === <div></div>) {
    return (
      <div>
        <p>
          <a href="/toLogin">Login</a> to create a post!
        </p>
      </div>
    );
  } else if (posts.length < 1) {
    return (
      <div className="container postDiv">
        <p>Create your first post!</p>
      </div>
    );
  } else
    return (
      <div className="container postDiv">
        <div className="posts">{renderPosts(posts)}</div>
        <span className="pageBar">
          page{"   "}
          {range(
            Math.max(0, postPage - 5),
            Math.min(postPage + 5, Math.floor(posts.length / postPerPage))
          ).map((v) =>
            v === postPage ? (
              <div
                className="pageClickDivSelect"
                onClick={(event) => setPostPage(v)}
              >
                {v + 1}
              </div>
            ) : (
              <div className="pageClickDiv" onClick={(event) => setPostPage(v)}>
                {v + 1}
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
