import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { fetchEmployees } from "./fake-fetch";

export default function DetailPage() {
  // const [isFetching, setFetching] = useState(false);
  // const [post, setpost] = useState([]);

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
  return (
    <div className="DetailPage">
      {
        // this.props.match.params.id
        /*<h2>{post.title}</h2>
      <p>{post.content}</p> */
        // postName
      }
    </div>
  );
}
