import axios from 'axios';
import { API_SERVICE_URL, AUTH_PORT } from './const';
import { signJwt } from '../utils/jwt';

const authService = axios.create({
  baseURL: `${API_SERVICE_URL}:${AUTH_PORT}`,
});

const setAuthTokenInSessionStorage = (authToken) =>
  sessionStorage.setItem('auth_token', authToken);

export const login = async (credentials) => {
  try {
    const { data } = await authService.put('/authenticate', credentials);
    setAuthTokenInSessionStorage(data.auth_token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (credentials) => {
  try {
    const { data } = await authService.put('/signin', credentials);
    setAuthTokenInSessionStorage(data.auth_token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const refresh = async (credentials) => {
  try {
    const { data } = await authService.put('/refresh', credentials);
    setAuthTokenInSessionStorage(data.auth_token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const googleAuth = async (payload) => {
  const jwt = await signJwt(payload);
  try {
    const { data } = await authService.put('/google_authenticate', {
      encoded: jwt,
    });
    setAuthTokenInSessionStorage(data.auth_token);
    return data;
  } catch (error) {
    throw error;
  }
};
