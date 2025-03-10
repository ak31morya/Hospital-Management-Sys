import React, { useState, useEffect } from "react";
import { getPatients, getPatientsByDoctorId, getPatientById, getPatientsByHealthProblem } from "../services/patientService";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchDoctorId, setSearchDoctorId] = useState("");
  const [searchPatientId, setSearchPatientId] = useState("");
  const [searchHealthProblem, setSearchHealthProblem] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    console.log("Patients Data:", data);
    setPatients(data);
  };

  const handleSearchByDoctorId = async () => {
    if (!searchDoctorId.trim()) return;
    const data = await getPatientsByDoctorId(searchDoctorId);
    setPatients(data);
  };

  const handleSearchByPatientId = async () => {
    if (!searchPatientId.trim()) return;
    const patient = await getPatientById(searchPatientId);
    setPatients(patient ? [patient] : []);
  };

  const handleSearchByHealthProblem = async () => {
    if (!searchHealthProblem.trim()) return;
    const data = await getPatientsByHealthProblem(searchHealthProblem);
    setPatients(data);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Patient List</h2>

      {/* Search Section */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Doctor ID"
            value={searchDoctorId}
            onChange={(e) => setSearchDoctorId(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearchByDoctorId}>
            Search
          </button>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Patient ID"
            value={searchPatientId}
            onChange={(e) => setSearchPatientId(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={handleSearchByPatientId}>
            Search
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Health Problem"
            value={searchHealthProblem}
            onChange={(e) => setSearchHealthProblem(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100" onClick={handleSearchByHealthProblem}>
            Search
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Health Problem</th>
              <th>Doctor ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
                  <td>{patient.patientName || "N/A"}</td>
                  <td>{patient.healthProblem || "N/A"}</td>
                  <td>{patient.doctorId || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-danger">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
