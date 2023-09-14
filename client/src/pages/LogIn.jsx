import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/v1/auth/login", { username, password })
      .then((res) => {
        if (res.data.user.username === "admin") {
          Swal.fire("Thành công", "You clicked the button!", "success");
          navigate("/");
        } else if (res.data.user.username === "user") {
          Swal.fire("Thành công", "You clicked the button!", "success");
          navigate("/todolist");
        }
        console.log("res:", res.data.user.username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-header">Đăng nhập</h1>

        <div className="mb-3">
          <input
            type="text"
            className="form-control input"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
