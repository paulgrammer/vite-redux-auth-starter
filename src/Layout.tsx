import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ApiManager from "./api/ApiManager";
import { sizeChanged } from "./redux/creators";

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function updateDimensions() {
    dispatch(sizeChanged());
  }

  useEffect(() => {
    if (!ApiManager.isLoggedIn()) {
      navigate("/login");
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  }, []);

  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
