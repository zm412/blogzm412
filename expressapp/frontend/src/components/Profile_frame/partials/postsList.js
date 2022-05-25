import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const PostsList = ({ postsArr }) => {
  console.log(postsArr, "postsArr");
  //const [postText, setPostText] = useState(postsArr);
  //src={"../../../../../public/037b9b9d9e5b3d9f86aa.jpg "}

  let list = postsArr.map((n, i) => (
    <div key={i}>
      <p>Created: {n.createdAt}</p>
      <p>Text: {n.post_text}</p>
      <img width="400px" height="400px" src={n.file_url} alt="" />
    </div>
  ));

  return <div>{list}</div>;
};
