import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UploadFileForm } from "./uploadFileForm.js";

export const PostsList = ({ postsArr }) => {
  const [message, setMessage] = useState("");
  const [newText, setNewText] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [updPostId, setUpdPostId] = useState(null);
  const userid = localStorage.getItem("userid");
  const closeUpload = () => {
    setIsChanging(false);
  };

  const upd_post = (e) => {
    setIsChanging(true);
    setUpdPostId(e.target.dataset.id);
  };

  const dlt_post = (e) => {
    let id = e.target.dataset.id;
    fetch(`/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => {
        setMessage(resp.message);
        if (resp.status == 403 || resp.status == 401) {
          localStorage.setItem("userid", "");
          localStorage.setItem("token", "");
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  let list = postsArr.map((n, i) => {
    let imgEx = ["jpeg", "jpg", "png"];

    let isImg;
    if (n.file_url) {
      isImg = imgEx.some((k) => n.file_url.endsWith(k));
    }
    return (
      <div key={i}>
        <p>Author: {n.user.username}</p>
        <p>Created: {n.createdAt}</p>
        <p>Text: {n.post_text}</p>

        {n.file_url && isImg ? (
          <img width="400px" height="400px" src={n.file_url} alt="" />
        ) : n.file_url && !isImg ? (
          <video width="400px" src={n.file_url} controls="controls" />
        ) : (
          ""
        )}

        {n.user.id == userid && (
          <div>
            <button
              className="btn btn-success m-3"
              data-id={n.id}
              onClick={upd_post}
            >
              Update
            </button>
            {isChanging && n.id == updPostId && (
              <UploadFileForm
                closeUpload={closeUpload}
                mode="update"
                updText={n.post_text}
                postid={n.id}
              />
            )}
            <button
              data-id={n.id}
              className="btn btn-success m-3"
              onClick={dlt_post}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
      {list}
    </div>
  );
};
