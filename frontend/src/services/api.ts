import axios from 'axios';

const BACKEND_URL = `/api`;

export const api = axios.create({
  baseURL: BACKEND_URL,
});