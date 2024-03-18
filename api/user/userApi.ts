import { AxiosInstance } from "axios";

export function getAllSpecialist(axiosAuth: AxiosInstance, params: any) {
  return axiosAuth.get("/specialist", { params });
}


