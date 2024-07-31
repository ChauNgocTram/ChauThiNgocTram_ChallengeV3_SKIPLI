
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../config/axios";

export const sendVerificationCode = async (phoneNumber) => {
  const response = await api.post(`${API_ENDPOINTS.USERS}/create-access-code`, { phoneNumber });
  return response.data;
};

export const validateAccessCode = async (phoneNumber, accessCode) => {
  const response = await api.post(`${API_ENDPOINTS.USERS}/validate-access-code`, { phoneNumber, accessCode });
  return response.data;
};

export const saveGeneratedContent = async (topic, data, phone_number) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.USERS}/save-generated-content`, { topic, data, phone_number });
    return response.data;
  } catch (error) {
    console.error("Error saving content:", error);
    throw error; 
  }
};



export const fetchUserGeneratedContents = async (phoneNumber) => {
  const response = await api.get(`${API_ENDPOINTS.USERS}/user-generated-contents`, {
    params: { phoneNumber } 
  });
  return response.data;
};
