import axios from 'axios';
import { API_SERVICE_URL, WORKER_PORT } from './const';

const backworkerService = axios.create({
  baseURL: `${API_SERVICE_URL}:${WORKER_PORT}`,
});
