import React, { useState } from "react";
import { fetchEmployees } from "./fake-fetch";

export default function DetailPage({ query }) {
  const [isFetching, setFetching] = useState(false);
  const [post, setpost] = useState([]);

  useEffect(
    function fetch() {
      (async function () {
        setFetching(true);
        setpost(await fetchEmployees(query));
        setFetching(false);
      })();
    },
    [query]
  );

  if (isFetching) {
    return <div>Fetching employees....</div>;
  }
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
