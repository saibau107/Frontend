import api from './api';
import { API_ROUTES } from '../utils/constants';
import { setToken, removeToken } from '../utils/token';

export const loginUser = async (credentials) => {
  const response = await api.post(API_ROUTES.LOGIN, credentials);
  setToken(response.data.token);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post(API_ROUTES.REGISTER, userData);
  return response.data;
};

export const logoutUser = async () => {
  await api.post(API_ROUTES.LOGOUT);
  removeToken();
};

export const resetPassword = async (email) => {
  const response = await api.post(API_ROUTES.RESET_PASSWORD, { email });
  return response.data;
};

export const socialLogin = async (provider, token) => {
  const response = await api.post(`${API_ROUTES.LOGIN}/${provider}`, { token });
  setToken(response.data.token);
  return response.data;
};

export const socialRegister = async (provider, userData) => {
  const response = await api.post(`${API_ROUTES.REGISTER}/${provider}`, userData);
  return response.data;
};