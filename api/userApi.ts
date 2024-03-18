import { AxiosInstance } from "axios";

// export function getUserById(axiosAuth: AxiosInstance, userId: string) {
//   return axiosAuth.get(`/user/${userId}`);
// }

export function getMyUser(axiosAuth: AxiosInstance, userId: number) {
  return axiosAuth.get(`user-management/user/${userId}`);
}
