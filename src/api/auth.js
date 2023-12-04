import axios from 'axios';
import { API_SERVICE_URL, AUTH_PORT } from './const';
import { signJwt } from '../utils/jwt';

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

export const refresh = async (credentials) => {
  try {
    const response = await authService.put('/refresh', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuth = async (payload) => {
  const jwt = await signJwt(payload);
  try {
    const response = await authService.put('/google_authenticate', {
      encoded: jwt,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
