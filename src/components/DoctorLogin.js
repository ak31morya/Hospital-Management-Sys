import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5246/api/Doctors/login"; 

function DoctorLogin() {
  const [doctorUserName, setDoctorUserName] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, { doctorUserName, doctorPassword });

      if (response.data.token) {  
        localStorage.setItem("token", response.data.token); // ✅ Save token in localStorage
        setMessage("Login Successful!");
        window.location.href = "/doctor-dashboard"; 
      } else {
        setMessage("Login failed. No token received.");
      }

    } catch (error) {
      setMessage(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Doctor Login</h2>
      {message && <p className="text-danger">{message}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={doctorUserName} onChange={(e) => setDoctorUserName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={doctorPassword} onChange={(e) => setDoctorPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default DoctorLogin;
