import React, { useState } from "react";
import axios from "axios";

function DoctorForm() {
  const [doctor, setDoctor] = useState({
    doctorName: "",
    speciality: "",
    qualification: "",
    doctorUserName: "",
    doctorPassword: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5246/api/Doctors", doctor);
      alert("Doctor added successfully!");
      setDoctor({
        doctorName: "",
        speciality: "",
        qualification: "",
        doctorUserName: "",
        doctorPassword: "",
        email: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Doctor</h2>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Doctor Name:</label>
          <input
            type="text"
            className="form-control"
            name="doctorName"
            value={doctor.doctorName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Speciality:</label>
          <select
            className="form-select"
            name="speciality"
            value={doctor.speciality}
            onChange={handleChange}
            required
          >
            <option value="">Select Speciality</option>
            <option value="CARDIO">Cardio</option>
            <option value="KIDNEY">Kidney</option>
            <option value="LIVER">Liver</option>
            <option value="GENERAL">General</option>
            <option value="ENT">ENT</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Qualification:</label>
          <input
            type="text"
            className="form-control"
            name="qualification"
            value={doctor.qualification}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            name="doctorUserName"
            value={doctor.doctorUserName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name="doctorPassword"
            value={doctor.doctorPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile:</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={doctor.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default DoctorForm;
