import React from "react";
//import { Profile } from "./Profile";
import { LoginPage } from "./Profile_frame/pages/login.js";
import { RegisterPage } from "./Profile_frame/pages/register.js";
import { useState, useEffect } from "react";

export const App = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [token, setToken] = useState(null);

  const registerOnHandler = () => setRegisterMode(true);
  const getToken = (tk) => setToken(tk);

  return (
    <div className="App-header">
      <div>
        {registerMode && !token ? (
          <RegisterPage getToken={getToken} />
        ) : (
          <LoginPage registerOnFunc={registerOnHandler} />
        )}
      </div>
    </div>
  );
};

export default App;
