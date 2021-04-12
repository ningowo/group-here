import React from "react";
import PropTypes from "prop-types";

const PostList = (props) => {
  const { posts } = props;

  const renderPosts = () => {
    return posts.map((post, i) => (
      <div key={"Post" + i}>
        <p>{post.likes}</p>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </div>
    ));

    // return movies.map((m, i) => <div key={"Movie" + i}>{m.title}</div>);
  };

  return (
    <div class="col-8" className="PostList">
      {renderPosts()}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
