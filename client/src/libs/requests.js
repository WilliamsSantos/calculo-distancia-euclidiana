import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
