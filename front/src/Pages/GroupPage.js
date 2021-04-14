import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// 这个可以删了，用GroupList这个component
export default function GroupPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  let [total, setTotal] = useState(0);
  let [reload, setReload] = useState(0);

  const params = useParams();

  console.log("groupPage", params);

  const renderPost = async () => {};
  return (
    <div>
      <h2>{params.id}</h2>
      <div className="row">
        <div className="col-8">{renderPost}</div>
        <div className="col-4">recommends here</div>
      </div>
    </div>
  );
}
