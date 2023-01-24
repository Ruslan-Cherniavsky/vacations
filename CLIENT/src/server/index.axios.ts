import axios, { AxiosError } from "axios";
import { getTokenLS } from "./localStorage";

const axiosInstance: any = axios.create({ baseURL: "https://vacations-api.onrender.com" });
axiosInstance.interceptors.request.use((request: any) => {
  request.headers.authorization = getToken();
  return request;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: AxiosError) => {
    alert("YOU SHALL NOT PASS");
    return Promise.reject(error);
  }
);

function getToken() {
  return getTokenLS();
}
export default axiosInstance;
