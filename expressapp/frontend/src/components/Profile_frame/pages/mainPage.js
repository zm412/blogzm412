import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UploadFileForm } from "../partials/uploadFileForm.js";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const MainPage = () => {
  const [isPosting, setIsPosting] = useState(false);

  const handlerButton = () => setIsPosting(true);
  const closeUpload = () => {
    setIsPosting(false);
  };

  return (
    <div>
      <div className="row mt-5">
        <button
          data-connect="#id_type_category"
          className="btn btn-success mt-2 center_cl col-sm-7"
          onClick={handlerButton}
          variant="primary"
        >
          Add post
        </button>
        {isPosting && <UploadFileForm closeUpload={closeUpload} />}
      </div>
    </div>
  );
};
