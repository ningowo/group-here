import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const query = props.query;
  const limit = props.limit ? props.limit : 0;
  const [postPage, setPostPage] = useState(0);
  const postPerPage = 50;

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
      console.log("res from be", res.data);
      setPosts(res.data);
      // setPosts(res.data);
      console.log("after setgroup", posts);
    };
    fetchPostList();
  }, [query]);

  console.log("props in postlist", query);

  const renderPosts = (postsInput) => {
    return postsInput ? (
      postsInput
        .slice(postPage * postPerPage, (postPage + 1) * postPerPage)
        .map((post) => (
          <div class="postDiv" key={post._id}>
            <div class="likes">
              <span>❤</span>
              {/*<span>{post.likes} likes</span>*/}
            </div>
            <div class="postContentDiv">
              <h5>
                <a href={"/detail/" + post.post_name}>{post.post_name}</a>
              </h5>
              <div class="postOverview">
                <p>{post.content}</p>
              </div>
              <div class="source">
                <span class="groupName">
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

  return (
    <div>
      <div className="posts">{renderPosts(posts)}</div>
      <span>
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
