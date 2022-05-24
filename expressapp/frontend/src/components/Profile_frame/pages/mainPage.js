import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const MainPage = () => {
  const [username, setUsername] = useState("");
  console.log(localStorage.getItem("token"), "tokenStorage");

  return <div>Main Page</div>;
};
