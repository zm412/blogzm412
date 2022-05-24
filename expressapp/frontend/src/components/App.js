import React from "react";
//import { Profile } from "./Profile";
import { Layout } from "./Profile_frame/layout/layout.js";
import { useState, useEffect } from "react";
import { Context } from "./Context.js";

export const App = () => {
  const [context, setContext] = useState(null);

  return (
    <div className="App-header">
      <Context.Provider value={[context, setContext]}>
        <Layout />
      </Context.Provider>
    </div>
  );
};

export default App;
