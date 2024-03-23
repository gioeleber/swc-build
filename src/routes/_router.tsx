import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

export enum PATHS {
  Home = "/",
  About = "/about",
}

const router = createBrowserRouter([
  {
    path: PATHS.Home,
    element: <Root />,
    children: [
      {
        path: PATHS.Home,
        async lazy() {
          const { Home } = await import("./home");
          return {
            Component: Home,
          };
        },
      },
      {
        path: PATHS.About,
        async lazy() {
          const { About } = await import("./about");
          return {
            Component: About,
          };
        },
      },
    ],
  },
]);

export default router;
