import React from "react";
import PropTypes from "prop-types";
import JoinGroup from "./joinGroup";

const GroupList = (props) => {
  const { groups } = props;

  const renderGroups = () => {
    return groups.map((group, i) => (
      <div class="groupDiv" key={"Group" + i}>
        <div class="groupName">{group.group_name}</div>
        {/*下面这行想统计一下小组里的人数，不过如果最后不方便写也可以删了*/}
        <div className="groupMemberNum">{group.membersCount}</div>
        <JoinGroup username=""></JoinGroup>
        <br></br>
      </div>
    ));
  };

  return <div className="groupList"></div>;
};

GroupList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default GroupList;
