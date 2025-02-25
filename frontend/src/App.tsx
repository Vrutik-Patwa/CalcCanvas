import Home from "./screens/home";

// import Home from "../src/screens/home/index";
import { Routes, Route, Router } from "react-router-dom";
import "@mantine/core/styles.css";
// import React = require("react"); //Not working
import { MantineProvider } from "@mantine/core";
import React from "react";
const paths = [
  {
    path: "/",
    element: <Home />,
  },
];

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const BrowserRouter = createBrowserRouter(paths);

// import React from "react";

const App = () => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      {/* <RouterProvider paths={paths}/> */}
    </MantineProvider>
  );
};

export default App;
