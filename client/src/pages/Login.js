import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await axios.post("https://mern-auth-j578.onrender.com/api/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center">Login</h3>

        <input className="form-control mb-2" placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})} />

        <input className="form-control mb-3" type="password" placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})} />

        <button className="btn btn-success w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;