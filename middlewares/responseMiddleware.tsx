import { toast } from "react-toastify";

export const handleApiResponse = (response: any, customMessage?: string) => {
  console.log("response?.message", response?.message);
  if (response?.status === 200) {
    toast.success(response?.message || "create successfully" || customMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (response?.status === 201) {
    toast.success(response?.message || "create successfully" || customMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (response?.status === 204) {
    toast.success(response?.message || "delete successfully" || customMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
