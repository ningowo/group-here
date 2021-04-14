import React, { useState, useEffect } from "react";

export default function JoinGroup(prop) {
  const [inGroup, setInGroup] = useState();
  const group;
  const username;
  // 这里判断一下用户是否在组里

  if (inGroup) {
    return <div>joined</div>;
  } else {
    return (
      <form action="/joinGroup" method="GET">
        <input type="hidden" className="joinGroupName" value={group} />
        <input type="hidden" className="joinUsername" value={username} />
        <button className="btn btn-outline-primary" type="submit">
          + Join group
        </button>
      </form>
    );
  }
}
