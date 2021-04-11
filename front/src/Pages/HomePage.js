import React, { useState } from "react";
import PostList from "../Components/PostList";
import Recommends from "../Components/Recommends";

export default function HomePage() {
  return (
    <div>
      <PostList></PostList>
      <Recommends></Recommends>
    </div>
  );
}
