import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import JoinGroup from "./JoinGroup.js";

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  const { query, reload } = props;

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
      //console.log("res from be", res.data);
      setGroups(res.data);
      //console.log("after setgroup", groups);
    };
    fetchPostList();
  }, [reload]);

  const renderGroups = (groupsInput) => {
    return groupsInput ? (
      groupsInput.map((group) => (
        <div className="groupDiv" key={group._id}>
          <div className="groupName">
            <a href={"/group/" + encodeURIComponent(group.group_name)}>
              {group.group_name}
            </a>
          </div>
          {/*统计一下小组人数*/}
          {/*<div className="groupMemberNum">{group.members.length}</div>*/}
          {/*<JoinGroup username={username} group={group}></JoinGroup>*/}
        </div>
      ))
    ) : (
      <div></div>
    );
  };
  return <div className="groupList">{renderGroups(groups)}</div>;
};

GroupList.propTypes = {
  query: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  reload: PropTypes.number.isRequired,
};

export default GroupList;
