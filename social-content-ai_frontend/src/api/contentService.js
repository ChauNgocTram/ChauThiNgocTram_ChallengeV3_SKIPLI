import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../config/axios";

export const generatePostCaptions = async ({ socialNetwork, subject, tone }) => {
  const response = await api.post(`${API_ENDPOINTS.CONTENT}/generate-post-captions`, {
    socialNetwork,
    subject: subject,
    tone,
  });
  return response.data;
};

