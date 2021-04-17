import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);
  const query = props.query;
  const limit = props.limit ? props.limit : 0;

  useEffect(() => {
    const fetchCommentsList = async () => {
      const data = { colName: "comments", query: query, limit: limit };
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
      setComments(res.data);
      // setPosts(res.data);
      console.log("after setgroup", comments);
    };
    fetchCommentsList();
  }, []);

  const renderComments = (commentsInput) => {
    return commentsInput ? (
      commentsInput.map((comment) => (
        <div class="commentDiv" key={comment._id}>
          <div className="commentInfo">
            {comment.author} {comment.create_date}
          </div>
          <div class="commentContent">{comment.content}</div>
          <br></br>
        </div>
      ))
    ) : (
      <div></div>
    );
  };

  return <div>{renderComments(comments)}</div>;
};

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
  limit: PropTypes.number,
};

export default CommentList;
