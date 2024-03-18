import { AxiosInstance } from "axios";

type RequestMethod = "GET" | "POST" | "DELETE" | "PATCH";

export function apiRequest(
  axiosAuth: AxiosInstance,
  method: RequestMethod,
  endpoint: string,
  data?: any
) {
  const config = {
    url: endpoint,
    method,
    ...(method === "GET" ? { params: data } : { data }),
  };
  console.log(config);
  return axiosAuth(config);
}
