import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { fetchEmployees } from "./fake-fetch";

export default function DetailPage() {
  // const [isFetching, setFetching] = useState(false);
  const [post, setpost] = useState([]);
  const [comments, setComments] = useState([]);

  const params = useParams();

  console.log("params", params);

  // useEffect(
  //   function fetch() {
  //     (async function () {
  //       setFetching(true);
  //       // setpost(await fetchEmployees(query));
  //       setFetching(false);
  //     })();
  //   },
  //   [query]
  // );

  // if (isFetching) {
  //   return <div>Fetching employees....</div>;
  // }
  const renderComments = () => {
    return comments.map((comment, i) => (
      <div class="commentDiv" key={"Comment" + i}>
        <div className="commentInfo">
          {comment.author} {comment.create_date}
        </div>
        <div class="commentContent">{comment.content}</div>
        <br></br>
      </div>
    ));
  };

  return (
    <div className="DetailPage">
      {/*左边是具体的post内容和评论*/}
      <div className="col-8 postDetailDiv">
        <div className="postName">{post.post_name}</div>
        <div className="author">{post.author}</div>
        <div className="postContent">{post.content}</div>
        <br></br>
        <div className="postComments">{renderComments()}</div>
      </div>
      <div className="col-4">{/*右边是加入小组的选项*/}</div>
    </div>
  );
}
