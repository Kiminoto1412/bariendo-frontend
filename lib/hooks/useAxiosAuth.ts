"use client";

import { useEffect } from "react";
import { axiosAuth } from "../axios";
import { useSession } from "next-auth/react";

import { useRefreshToken } from "./useRefreshToken";
import { customLogout } from "@/utils/CustomLogout";

const useAxiosAuth = () => {
  const { data: session, status } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        console.log("Request interceptor triggered");
        console.log("session.accessToken", session?.accessToken);
        // console.log("session.refreshToken", session?.refreshToken);

        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `${session?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // const responseIntercept = axiosAuth.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 401 && !prevRequest?.sent) {
    //       prevRequest._retry = true;
    //       console.log("Reponse interceptor triggered");

    //       if (session?.expires  <= Date.now()) {
    //         console.log(999999);
    //         alert("Your session has expired!");
    //         customLogout();
    //         return;
    //       } else {
    //         await refreshToken();

    //         // console.log("session?.accessToken", session?.accessToken);

    //         prevRequest.headers[
    //           "Authorization"
    //         ] = `Bearer ${session?.accessToken}`;

    //         return axiosAuth(prevRequest);
    //       }
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      // axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
