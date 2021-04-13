import React, { useState } from "react";
import PostList from "../Components/PostList";
import Recommends from "../Components/Recommends";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Here is a title</h1>
      <div className="row">
        <div className="col-8">
          post here
          <div>
            <a id="postTitle" href="/detail/test">
              test
            </a>
          </div>
        </div>
        <div className="col-4">recommends here</div>
        {/*        <PostList></PostList>
        <Recommends></Recommends>*/}
      </div>
    </div>
  );
}
