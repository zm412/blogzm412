import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const UploadFileForm = ({
  closeUpload,
  mode,
  updText = "",
  postid = "",
}) => {
  const [post_text, setPostText] = useState(updText);
  const [fileData, setFileData] = React.useState(null);
  const [isFileChanged, setIsFileChanged] = React.useState(false);
  const [postId, setPostId] = React.useState(postid);
  const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setIsFileChanged(true);
    setFileData(e.target.files[0]);
  };

  let updPost = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("post_text", post_text);
    formdata.append("userid", userid);
    if (isFileChanged) formdata.append("file_item", fileData);

    fetch(`/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formdata,
    })
      .then((resp) => {
        setMessage(resp.message);
        if (resp.status == 403 || resp.status == 401) {
          localStorage.setItem("userid", "");
          localStorage.setItem("token", "");
        }
        return resp.json();
      })
      .then((doc) => {
        if (doc.message) {
        } else {
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  let sendPost = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    formdata.append("userid", userid);
    fetch(`/add_post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formdata,
    })
      .then((resp) => {
        setMessage(resp.message);
        if (resp.status == 403 || resp.status == 401) {
          localStorage.setItem("userid", "");
          localStorage.setItem("token", "");
        }
        return resp.json();
      })
      .then((doc) => {})
      .catch((err) => {
        console.log(err, "err");
      });

    closeUpload();
    setPostText("");
    e.target.reset();
  };

  let submitFunc = mode == "create" ? sendPost : updPost;

  return (
    <div>
      <h1 style={{ color: "red" }}>{message}</h1>
      <div className="row mt-5">
        <div id="id_type_category">
          <div id="id_form">
            <h6>Add post</h6>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={submitFunc}
            >
              <input
                type="text"
                className="form-control"
                required
                placeholder="add text"
                onChange={(e) => setPostText(e.target.value)}
                name="post_text"
                value={post_text}
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
              <input
                type="submit"
                className="btn btn-primary mt-2 "
                value="Send"
              />
            </form>
            <input
              type="submit"
              className="btn btn-primary mt-2"
              onClick={closeUpload}
              value="Cancel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
