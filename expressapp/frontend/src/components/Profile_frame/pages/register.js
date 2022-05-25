import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const RegisterPage = ({
  getUser,
  user,
  funcBack,
  setTokenFunc,
  token,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/register", {
      method: "POST",
      body: new FormData(event.target),
    })
      .then((resp) => resp.json())
      .then((doc) => {
        if (doc.message) {
          setMessage(doc.message);
        } else {
          console.log(doc, "DOC");
          localStorage.setItem("token", doc.token);
          localStorage.setItem("userid", doc.user.id);
          setTokenFunc(doc.token);
          funcBack();
        }
      })
      .catch((err) => console.log(err, "err"));
    console.log("Отправлена форма.");
  };

  return (
    <div>
      <h2>Register</h2>
      <h5>{message}</h5>
      <form onSubmit={handleSubmit} id="form_register">
        <div className="form-group m-3">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="form-group m-3">
          <input
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group m-3">
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        <input className="btn btn-primary m-3" type="submit" value="Register" />
      </form>
      Already have an account? <a href="">Log In here.</a>
    </div>
  );
};
