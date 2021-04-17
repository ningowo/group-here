import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// 这个component还要再改改
export default function JoinGroup(props) {
  const { group, username } = props;
  const [inGroup, setInGroup] = useState(false);

  if (!username) {
    return (
      <div>
        <a href="/toLogin">Sign in to join group</a>
      </div>
    );
  }

  // 这里判断一下用户是否在组里
  if (group.members.includes(username)) {
    setInGroup(true);
  } else {
    setInGroup(false);
  }

  const joinGroup = async (event) => {
    event.preventDefault();
    // TODO: implement this later
  };

  if (inGroup) {
    return <div>joined</div>;
  } else {
    return (
      <form action="/joinGroup" method="GET">
        <input
          type="hidden"
          className="joinGroupName"
          value={group.group_name}
        />
        <input type="hidden" className="joinUsername" value={username} />
        <button
          className="btn btn-outline-primary"
          type="button"
          onclick={joinGroup}
        >
          + Join group
        </button>
      </form>
    );
  }
}

JoinGroup.propTypes = {
  group: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};
