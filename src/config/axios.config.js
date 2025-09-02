import axios from "axios";
import { serverURL } from "../constants";

export const privateAxios = axios.create({
  baseURL: serverURL,
  withCredentials: true, // send cookies always
});

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // // block request if 403
    // if (error.response?.status === 403) {
    //   return Promise.reject(error);
    // }
    // If 401, try to refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Ask server for fresh cookies
        await privateAxios.post(`/users/refresh-token`);

        // Retry the original request with cookies (no token juggling needed)
        return privateAxios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
