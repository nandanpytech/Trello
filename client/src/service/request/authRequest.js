const { axiosInstance, endPoints } = require('@/config/axios');

// Authentication Requests
const registerUser = async ({ payload }) => {
  return await axiosInstance.post(endPoints.auth.register, payload);
};

const verifyOtp = async ({ payload }) => {
  return await axiosInstance.post(endPoints.auth.verifyOtp, payload);
};

const getUserInfo = async ({ payload }) => {
  return await axiosInstance.post(endPoints.auth.getUserInfo);
};

const logInUser = async ({ payload }) => {
  return await axiosInstance.post(endPoints.auth.logIn, payload);
};

export { registerUser, verifyOtp, getUserInfo, logInUser };
