import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import JoinGroup from "./joinGroup.js";
import PostList from "./PostList.js";

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  const { query } = props;

  useEffect(() => {
    const fetchPostList = async () => {
      const data = { colName: "groups", query: query };
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
      setGroups(res.data);
      console.log("after setgroup", groups);
    };
    fetchPostList();
  }, []);

  const renderGroups = () => {
    return groups.map((group) => (
      <div class="groupDiv" key={group._id}>
        <div class="groupName">{group.group_name}</div>
        {/*下面这行想统计一下小组里的人数，不过如果最后不方便写也可以删了*/}
        <div className="groupMemberNum">{group.members.length}</div>
        <PostList query={{ group: group.group_name }} />
        <JoinGroup username=""></JoinGroup>
        <br></br>
      </div>
    ));
  };

  return <div className="groupList">{renderGroups()}</div>;
};

GroupList.propTypes = {
  query: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default GroupList;
