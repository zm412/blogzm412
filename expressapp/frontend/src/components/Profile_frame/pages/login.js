import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const LoginPage = ({ registerOnFunc, user, setTokenFunc, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDataPost("/login", { email, password })
      .then((doc) => {
        if (doc.message) {
          setMessage(doc.message);
        } else {
          localStorage.setItem("token", doc.token);
          localStorage.setItem("userid", doc.user.id);
          setTokenFunc(doc.token);
        }
      })
      .catch((err) => console.log(err, "err"));
    console.log("Отправлена форма.");
  };
  return (
    <div>
      <h2 className="m-3">Login</h2>
      <form action="" onSubmit={handleSubmit} method="post">
        <div className="form-group m-3">
          <input
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group m-3">
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />
        </div>
        <input className="btn btn-primary m-3" type="submit" value="Login" />
      </form>
      Don't have an account?
      <a className="m-3" href="#" onClick={registerOnFunc}>
        Register here.
      </a>
    </div>
  );
};
