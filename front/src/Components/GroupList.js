import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import JoinGroup from "./JoinGroup.js";
import PostList from "./PostList.js";

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  const { query, username, reload } = props;

  useEffect(() => {
    const fetchPostList = async () => {
      //console.log("query is ", query);
      const data = { colName: "groups", query: query };
      const res = await // await fetch("/getGroups", {
      (
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
      // setGroups((prevGroups) => [...prevGroups, ...res.data]);
      console.log("after setgroup", groups);
    };
    fetchPostList();
  }, [reload]);

  const renderGroups = (groupsInput) => {
    return groupsInput ? (
      groupsInput.map((group) => (
        <div class="groupDiv" key={group._id}>
          <div class="groupName">
            <a href={"/group/" + group.group_name}>{group.group_name}</a>
          </div>
          {/*下面这行想统计一下小组里的人数，不过如果最后不方便写也可以删了*/}
          {/*<div className="groupMemberNum">{group.members.length}</div>*/}
          {/*<PostList query={{ group: group.group_name }} limit={5} />*/}
          {/*<JoinGroup username={username} group={group}></JoinGroup>*/}
          <br></br>
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
