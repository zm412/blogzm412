import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDataPost,
  fetchDataGet,
  fetchFormdataPost,
} from "../../collection_func";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event) => {
    let form = document.querySelector("#form_register");
    event.preventDefault();
    console.log(event.target, "target");
    const formData = new FormData(form);
    console.log(formData, "formdata");
    let answ = fetchFormdataPost("/register", formData);
    console.log("Отправлена форма.");
    console.log(answ, "answ");
  };

  return (
    <div>
      <h2>Register</h2>
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
        <div className="form-group m-3">
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            name="confirmation"
            placeholder="Confirm Password"
          />
        </div>
        <input className="btn btn-primary m-3" type="submit" value="Register" />
      </form>
      Already have an account? <a href="">Log In here.</a>
    </div>
  );
};
