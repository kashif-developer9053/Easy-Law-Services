import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    console.log('Token from Cookies (axiosConfig.js):', token); // Add this line
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

