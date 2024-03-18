import { AxiosInstance } from "axios";

export function getAllOrganization(axiosAuth: AxiosInstance) {
  return axiosAuth.get("organization");
}
