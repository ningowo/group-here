import React from "react";
import PropTypes from "prop-types";

const PostList = (props) => {
  const { posts } = props;

  const renderPosts = () => {
    return posts.map((post, i) => (
      <div class="postDiv" key={"Post" + i}>
        <div class="likes">{post.likes} likes</div>
        <div class="postContentDiv">
          <h3>
            <a href="">{post.post_name}</a>
          </h3>
          <div class="postOverview">
            <p>{post.content}</p>
          </div>
          <div class="source">
            <span class="groupName">
              From
              <a href="">{post.group}</a>
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
  posts: PropTypes.array.isRequired,
};

export default PostList;
