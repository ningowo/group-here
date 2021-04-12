import React from "react";
import PropTypes from "prop-types";

const Recommends = (props) => {
  const { recommends } = props;

  const renderRecommends = () => {
    return recommends.map((r, i) => (
      <div key={"Recommend" + i}>
        <image></image>
        <p>{r.groupName}</p>
        <form action="/joinGroup" method="post">
          {" "}
          + Join group
        </form>
      </div>
    ));
  };

  return (
    <div class="col-4" className="PostList">
      {renderRecommends()}
    </div>
  );
};

Recommends.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Recommends;
