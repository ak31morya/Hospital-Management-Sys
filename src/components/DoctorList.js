import React, { useState, useEffect } from "react";
import { getDoctors, getDoctorById, getDoctorsBySpecialization } from "../services/doctorService";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getDoctors();
    console.log("Doctors Data:", data); // Debugging
    setDoctors(data);
  };

  const handleSearchById = async () => {
    if (!searchId.trim()) return; // Prevent empty search
    const doctor = await getDoctorById(searchId);
    setDoctors(doctor ? [doctor] : []);
  };

  const handleSearchBySpecialization = async () => {
    if (!specialization.trim()) return; // Prevent empty search
    const data = await getDoctorsBySpecialization(specialization);
    setDoctors(data);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Doctor List</h2>

      {/* Search Section */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Doctor ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearchById}>
            Search by ID
          </button>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={handleSearchBySpecialization}>
            Search by Specialization
          </button>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Qualification</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.doctorId}>
                  <td>{doctor.doctorId}</td>
                  <td>{doctor.doctorName || "N/A"}</td>
                  <td>{doctor.speciality || "N/A"}</td>
                  <td>{doctor.qualification || "N/A"}</td>
                  <td>{doctor.doctorUserName || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-danger">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorList;
