import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const Form = ({ sendForm, onChangInp, onChangeFl, defaults = {} }) => {
  const [postText, setPostText] = useState("");
  const [fileData, setFileData] = React.useState(null);
  const [userid, setUserid] = useState(localStorage.getItem("userid"));

  const onFileChange = (e) => setFileData(e.target.files[0]);

  let sendPost = (e) => {
    e.preventDefault();
    console.log(userid, "userid");
    let formdata = new FormData(e.target);
    formdata.append("userid", userid);
    console.log(e.target, "etarget");
    fetch(`/add_post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formdata,
    })
      .then((resp) => resp.json())
      .then((doc) => console.log(doc, doc))
      .catch((err) => {
        localStorage.setItem("token", "");
        localStorage.setItem("userid", "");
        console.log(err, "err");
      });
    closeUpload();
    setPostText("");
    e.target.reset();
  };

  return (
    <div>
      <form encType="multipart/form-data" method="post" onSubmit={sendPost}>
        <input
          type="text"
          className="form-control"
          required
          placeholder="add text"
          onChange={(e) => setPostText(e.target.value)}
          name="postText"
          value={postText}
        />
        <input
          type="file"
          className="form-control"
          id="fileUpload"
          onChange={onFileChange}
          accept="image/*,video/*"
          placeholder="Upload"
          name="file_item"
        />
        <input type="submit" className="btn btn-primary mt-2 " value="Send" />
      </form>
    </div>
  );
};
