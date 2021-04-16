import React, { useState, useEffect } from "react";

export default function JoinGroup(prop) {
  let group;
  let username;
  const [inGroup, setInGroup] = useState(0);

  checkUserInGroup();

  useEffect(() => {
    setInGroup(checkUserInGroup);
  }, [inGroup, group, username]);

  const checkUserInGroup = async () => {
    const data = {
      colName: "users",
      query: { username: { username }, "groups.*": { group } },
    };
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

    console.log("join group query res", res.data);
    return data ? 1 : 0;
  };

  const updateGroup = async (event) => {
    event.preventDefault();

    const data = {
      colName: "groups",
      query: { member: { username } },
    };
    const res = await (
      await fetch("/update", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();

    const data1 = {
      colName: "users",
      query: { groups: { group } },
    };
    const res1 = await (
      await fetch("/update", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();
  };

  // ingroup == 1 for join
  // first do the check, then update if click join button
  if (inGroup === 1) {
    return <div>joined</div>;
  } else {
    return (
      <form onSubmit={updateGroup}>
        <input type="hidden" className="joinGroupName" value={group} />
        <input type="hidden" className="joinUsername" value={username} />
        <button className="btn btn-outline-primary" type="submit">
          + Join group
        </button>
      </form>
    );
  }
}
