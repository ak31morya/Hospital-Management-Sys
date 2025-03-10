import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DoctorList from "./components/DoctorList";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";
import DoctorLogin from "./components/DoctorLogin";
import DoctorForm from "./components/DoctorForm";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Hospital Management</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">Show Doctors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-doctor">Add Doctor</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patients">Show Patients</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-patient">Add Patient</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor-login">Doctor Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Welcome Section */}
        <h1>Welcome to Hospital Management System</h1>
        <p className="lead">Hospital Managed by Dr. Aashish with Lots Of Love ❤️</p>

        {/* Routing */}
        <Routes>
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/add-doctor" element={<DoctorForm />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/add-patient" element={<PatientForm />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
