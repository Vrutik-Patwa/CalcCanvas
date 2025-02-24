import Home from "./screens/home";
import { Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import React = require("react");
import { MantineProvider } from "@mantine/core";

const paths = [
  {
    path: "/",
    element: <Home />,
  },
];

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const BrowserRouter = createBrowserRouter(paths);
const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={BrowserRouter} />
    </MantineProvider>
  );
};

export default App;
