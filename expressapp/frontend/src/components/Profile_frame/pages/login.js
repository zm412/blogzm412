import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const LoginPage = ({ registerOnFunc }) => {
  return (
    <div>
      <h2 className="m-3">Login</h2>
      <form action="" method="post">
        <div className="form-group m-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group m-3">
          <input
            className="form-control"
            type="password"
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
