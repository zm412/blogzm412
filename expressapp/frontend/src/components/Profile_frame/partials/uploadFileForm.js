import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const UploadFileForm = ({ closeUpload }) => {
  const [postText, setPostText] = useState("");
  const [fileData, setFileData] = React.useState(null);

  const onFileChange = (e) => setFileData(e.target.files[0]);

  let sendPost = (e) => {
    e.preventDefault();
    console.log(e.target, "etarget");
    fetch(`/add_post`, {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((resp) => resp.json())
      .then((doc) => console.log(doc, doc))
      .catch((err) => console.log(err, "err"));
    closeUpload();
    setPostText("");
    e.target.reset();
  };

  return (
    <div>
      <div className="row mt-5">
        <div id="id_type_category">
          <div id="id_form">
            <h6>Add post</h6>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={sendPost}
            >
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
