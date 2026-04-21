import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://mern-auth-j578.onrender.com/api/register", form);
      alert(res.data.msg);
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center">Register</h3>

        <input className="form-control mb-2" placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />

        <input className="form-control mb-2" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />

        <input className="form-control mb-2" type="password" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <input className="form-control mb-2" placeholder="Course"
          onChange={e => setForm({...form, course: e.target.value})} />

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;