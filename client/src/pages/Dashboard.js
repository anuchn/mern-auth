import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      axios.get("https://mern-auth-j578.onrender.com/api/me", {
        headers: { Authorization: token }
      })
      .then(res => setUser(res.data))
      .catch(err => {
        console.log(err);
        alert("Session expired, login again");
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
    }
  }, [token]);

  const updateCourse = async () => {
    try {
      const res = await axios.put(
        "https://mern-auth-j578.onrender.com/api/update-course",
        { course },
        { headers: { Authorization: token } }
      );
      alert(res.data.msg);
    } catch (err) {
      alert("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      const res = await axios.put(
        "https://mern-auth-j578.onrender.com/api/update-password",
        { oldPassword, newPassword },
        { headers: { Authorization: token } }
      );
      alert(res.data.msg);
    } catch (err) {
      alert("Error updating password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Dashboard</h2>

      {!user ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="card p-3 shadow mb-3">
            <h4>Student Details</h4>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Course:</b> {user.course}</p>
          </div>

          <div className="card p-3 shadow mb-3">
            <h5>Update Course</h5>
            <input className="form-control mb-2"
              placeholder="New Course"
              onChange={e => setCourse(e.target.value)} />
            <button className="btn btn-warning" onClick={updateCourse}>
              Update Course
            </button>
          </div>

          <div className="card p-3 shadow mb-3">
            <h5>Update Password</h5>
            <input className="form-control mb-2" type="password"
              placeholder="Old Password"
              onChange={e => setOldPassword(e.target.value)} />
            <input className="form-control mb-2" type="password"
              placeholder="New Password"
              onChange={e => setNewPassword(e.target.value)} />
            <button className="btn btn-danger" onClick={updatePassword}>
              Update Password
            </button>
          </div>

          <button className="btn btn-dark w-100" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;