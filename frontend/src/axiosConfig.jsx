import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5002', // local
  // baseURL: 'http://http://16.176.171.16/:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
