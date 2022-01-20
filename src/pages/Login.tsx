import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiManager from "../api/ApiManager";

export default function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    if (ApiManager.isLoggedIn()) {
      navigate("/");
    }
  }, []);

  return <div>Login</div>;
}
