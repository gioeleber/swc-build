import React from "react";
import { PATHS } from "./_router";
import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <ul>
          {Object.entries(PATHS).map(([name, path]) => (
            <li>
              <NavLink
                to={path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </header>
      <div className="wrapper">
        <Outlet />
      </div>
      <footer>© SWC build</footer>
    </>
  );
}
