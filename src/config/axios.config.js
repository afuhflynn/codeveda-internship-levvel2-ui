import axios from "axios";
import { serverURL } from "../constants";

export const privateAxios = axios.create({
  baseURL: serverURL,
  withCredentials: true, // send cookies always
});

privateAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const res = await privateAxios.get("/users/refresh-token");
      const newAccessToken = res.data.accessToken;
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return privateAxios(prevRequest);
    }
  }
);
