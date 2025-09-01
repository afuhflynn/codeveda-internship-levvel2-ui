import axios from "axios";
import { serverURL } from "../constants";

export const privateAxios = axios.create({
  baseURL: serverURL,
  withCredentials: true,
  withXSRFToken: true,
});
