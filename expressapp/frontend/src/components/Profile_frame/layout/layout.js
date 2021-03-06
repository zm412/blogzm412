import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { LoginPage } from "../pages/login.js";
import { RegisterPage } from "../pages/register.js";
import { MainPage } from "../pages/mainPage.js";

export const Layout = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(localStorage.getItem("userid"));
  const [registerMode, setRegisterMode] = useState(false);
  const [loginMode, setLoginMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const registerModeOf = () => setRegisterMode(false);
  const setTokenFunc = (newToken) => setToken(newToken);

  const registerOnHandler = () => setRegisterMode(true);
  const logoutFunc = () => {
    setToken("");
    localStorage.setItem("token", "");
    localStorage.setItem("userid", "");
  };

  const content = token ? (
    <MainPage />
  ) : registerMode ? (
    <RegisterPage
      funcBack={registerModeOf}
      token={token}
      setTokenFunc={setTokenFunc}
    />
  ) : (
    <LoginPage
      registerOnFunc={registerOnHandler}
      user={user}
      setTokenFunc={setTokenFunc}
      token={token}
    />
  );
  return (
    <div>
      <ul className="nav topmenu justify-content-center">
        {token ? (
          <div>
            <li className="nav-item">
              <strong id="name_user">{user.username}</strong>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logoutFunc} href="#">
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Log In
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Register
              </a>
            </li>
          </div>
        )}
      </ul>

      <div className="body"> {content} </div>
    </div>
  );
};
