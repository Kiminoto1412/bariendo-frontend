import { AxiosInstance } from "axios";

export function getAllByPatientId(axiosAuth: AxiosInstance, params: any) {
  return axiosAuth.get("/appointment/all_by_patient_id", { params });
}

export function getAllTimeSlots(axiosAuth: AxiosInstance, params: any) {
  return axiosAuth.get("appointment/available_time_one_day", { params });
}

export function getAllDoctor(axiosAuth: AxiosInstance, params: any) {
  return axiosAuth.get("/appointment/doctor_by_specialist", { params });
}

export function createAppointment(axiosAuth: AxiosInstance, form: any) {
  return axiosAuth.post("/appointment", form);
}
