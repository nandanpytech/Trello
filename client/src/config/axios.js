import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject('An unexpected error occurred. Please try again later.');
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get token from localStorage
    if (userInfo) {
      const { token } = userInfo;
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const endPoints = {
  auth: {
    register: '/auth/register',
    verifyOtp: '/auth/verifyOtp',
    getUserInfo: '/dashboard/userInfo',
    logIn: '/auth/logIn',
  },
};

export { axiosInstance, endPoints };
