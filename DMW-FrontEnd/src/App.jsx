"use client";
import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import Routing from "./route/Routing";
import CustomAlert from "./component/CustomAlert/CustomAlert"; // Adjust path as needed

const App = () => {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <>
      {showWarning && (
        <CustomAlert show={showWarning} onClose={() => setShowWarning(false)} />
      )}
      <HashRouter>
        <Routing />
      </HashRouter>
    </>
  );
};

export default App;
