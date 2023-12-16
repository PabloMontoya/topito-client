import axios from 'axios';
import { API_SERVICE_URL, WORKER_PORT } from './const';

const backworkerService = axios.create({
  baseURL: `${API_SERVICE_URL}:${WORKER_PORT}`,
});

export const launch = async (json) => {
  const auth_token = sessionStorage.getItem('auth_token');
  const back_json = JSON.parse(json);

  const options = {
    auth_token,
    project_id: 'project_id',
    back_json,
  };

  try {
    const { data } = await backworkerService.put('/launch', options);
    return data;
  } catch (error) {
    throw error;
  }
};
