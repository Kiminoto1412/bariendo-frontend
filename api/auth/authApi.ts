import axios from "@/lib/axios";
import { AxiosInstance } from "axios";

export function signUp(form: any) {
  return axios.post(`/authentication/register`, form);
}

export function logOutApi(axiosAuth: AxiosInstance) {
  return axiosAuth.post(`/authentication/sign-out`);
}

export function changePasswordApi(axiosAuth: AxiosInstance, form: any) {
  return axiosAuth.post(`/authentication/reset-password`, form);
}
