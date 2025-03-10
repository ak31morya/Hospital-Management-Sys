import axios from "axios";

const API_URL = "http://localhost:5246/api/Doctors"; // Adjust the URL based on your backend

// Get all doctors
export const getDoctors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

// Get doctor by ID
export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return null;
  }
};

// Get doctors by specialization
export const getDoctorsBySpecialization = async (specialization) => {
  try {
    const response = await axios.get(`${API_URL}/specialization/${specialization}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors by specialization:", error);
    return [];
  }
};

// Add a new doctor
export const addDoctor = async (doctorData) => {
  try {
    const response = await axios.post(API_URL, doctorData);
    return response.data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    return null;
  }
};
