import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UploadFileForm } from "../partials/uploadFileForm.js";
import { PostsList } from "../partials/postsList.js";

export const MainPage = ({ user }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [postsArr, setPostsArr] = useState([]);

  const getList = () => {
    fetch("/get_posts")
      .then((resp) => resp.json())
      .then((doc) => {
        setPostsArr(doc.posts);
      })
      .catch((err) => console.log(err, "err"));
  };

  useEffect(() => {
    getList();
  }, []);

  const handlerButton = () => setIsPosting(true);
  const closeUpload = () => {
    setIsPosting(false);
  };

  return (
    <div>
      <div>
        <h5>Posts</h5>
        <div className="row mt-5">
          <PostsList postsArr={postsArr} />
        </div>
      </div>
      <div className="row mt-5">
        <button
          className="btn btn-success mt-2 center_cl col-sm-7"
          onClick={handlerButton}
          variant="primary"
        >
          Add post
        </button>
        {isPosting && (
          <UploadFileForm closeUpload={closeUpload} userid={user} />
        )}
      </div>
    </div>
  );
};
