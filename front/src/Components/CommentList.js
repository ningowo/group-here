import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);
  const { query, reload } = props;
  //const limit = props.limit ? props.limit : 0;
  console.log("query = ", query);
  useEffect(() => {
    const fetchCommentsList = async () => {
      const data = { colName: "comments", query: query };
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
      console.log("res data for comment: ", res.data);
      setComments(res.data);
      console.log("comments: ", comments);
    };
    fetchCommentsList();
  }, [reload, query]);

  const renderComments = (commentsInput) => {
    // console.log("render comments: ", commentsInput);
    return commentsInput ? (
      commentsInput.map((comment) => (
        <div className="commentDiv" key={comment._id}>
          <div className="commentInfo">
            {comment.author} {comment.create_date}
          </div>
          <div className="commentContent">{comment.content}</div>
          <br></br>
        </div>
      ))
    ) : (
      <div>
        <p>To be commented.</p>
      </div>
    );
  };

  return <div>{renderComments(comments)}</div>;
};

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
  reload: PropTypes.object.number.isRequired,
  limit: PropTypes.number,
};

export default CommentList;
