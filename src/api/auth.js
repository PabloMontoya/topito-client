import axios from 'axios';
import { API_SERVICE_URL, AUTH_PORT } from './const';

const authService = axios.create({
  baseURL: `${API_SERVICE_URL}:${AUTH_PORT}`,
});

export const login = async (credentials) => {
  try {
    const response = await authService.put('/authenticate', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (credentials) => {
  try {
    const response = await authService.put('/signin', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refresh = async (userData) => {
  try {
    const response = await authService.put('/refresh', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
