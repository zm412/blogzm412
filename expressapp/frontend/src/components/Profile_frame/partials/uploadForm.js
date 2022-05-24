import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const UploadForm = ({ fileData, onFileChange }) => {
  return (
    <div>
      <form
        encType="multipart/form-data"
        method="post"
        onSubmit={(e) => sendPost(e)}
      >
        <input
          type="file"
          className="form-control"
          id="fileUpload"
          onChange={onFileChange}
          placeholder="Upload"
          name="file_item"
        />
        <input type="submit" className="btn btn-primary mt-2 " value="Send" />
      </form>
    </div>
  );
};
