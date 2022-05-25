import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const PostsList = ({ postsArr }) => {
  const [message, setMessage] = useState("");
  console.log(postsArr, "postsArr");
  const userid = localStorage.getItem("userid");

  const upd_post = (e) => {};

  const dlt_post = (e) => {
    let id = e.target.dataset.id;
    fetch(`/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => {
        if (resp.status == 403) {
          setMessage("Time to log in");
          localStorage.setItem("userid", "");
          localStorage.setItem("token", "");
        }
      })
      .then((doc) => {
        if (doc.message) {
          setMessage("Time to log in");
        } else {
          console.log(doc, "DOC");
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
            <button data-id={n.id} onClick={upd_post}>
              Update
            </button>
            <button data-id={n.id} onClick={dlt_post}>
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
