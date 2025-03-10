import axios from "axios";

const API_URL = "http://localhost:5246/api/Patients";

// Get all patients
export const getPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

// Search patient by ID
export const getPatientById = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    return null;
  }
};

// Search patients by health problem
export const getPatientsByHealthProblem = async (healthProblem) => {
  try {
    const response = await axios.get(`${API_URL}/search?healthProblem=${healthProblem}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients by health problem:", error);
    return [];
  }
};

// Search patients by doctor ID
export const getPatientsByDoctorId = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/search?doctorId=${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients by doctor ID:", error);
    return [];
  }
};

// Add a new patient
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(API_URL, patientData);
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error);
    return null;
  }
};
