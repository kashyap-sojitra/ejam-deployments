import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Deployments from "./Components/Deployments/Deployments.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Deployments}/>
      </div>
    </BrowserRouter>
  );
}

export default App;