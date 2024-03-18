import axios from "axios";
import { Backend_URL } from "./constant";

export default axios.create({
  baseURL: Backend_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: Backend_URL,
  headers: { "Content-Type": "application/json" },
});
