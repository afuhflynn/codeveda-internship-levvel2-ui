import axios from "axios";
import { serverURL } from "../constants";

export const privateAxios = axios.create({
  baseURL: serverURL,
  withCredentials: true, // includes cookies
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Attach the fresh token to the failed request
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            return privateAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint (cookies handle refreshToken automatically)
        const response = await privateAxios.post("/users/refresh-token");

        const { accessToken } = response.data;

        if (!accessToken) {
          throw new Error("Refresh token expired or invalid");
        }

        // Update headers for queued requests
        processQueue(null, accessToken);

        // Attach new token and retry original request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return privateAxios(originalRequest);
      } catch (err) {
        // Refresh token failed: force logout / redirect
        processQueue(err, null);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
