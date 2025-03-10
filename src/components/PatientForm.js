import React, { useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    healthProblem: "",
    doctorId: "",
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5246/api/Patients", patient);
      alert("Patient added successfully!");
      setPatient({ name: "", age: "", healthProblem: "", doctorId: "" });
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Patient</h2>
      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={patient.name}
              onChange={handleChange}
              placeholder="Enter patient's name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={patient.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Health Problem</label>
            <input
              type="text"
              name="healthProblem"
              className="form-control"
              value={patient.healthProblem}
              onChange={handleChange}
              placeholder="Enter health problem"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Doctor ID</label>
            <input
              type="number"
              name="doctorId"
              className="form-control"
              value={patient.doctorId}
              onChange={handleChange}
              placeholder="Enter assigned Doctor ID"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
