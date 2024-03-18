import { toast } from "react-toastify";

export const handleError = (error: any) => {
  console.log("error", error);
  toast.error(
    error?.message ||
      error?.response?.data.message ||
      error?.response?.data.error || {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
  );
};
