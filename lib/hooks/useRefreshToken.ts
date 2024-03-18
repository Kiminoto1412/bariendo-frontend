"use client";

import axios from "../axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useRefreshToken = () => {
  const { data: session, update, status } = useSession();
  const refreshToken = async () => {
    // const res = await axios.post(
    //   "/auth/refresh-tokens",
    //   { refreshToken: session?.refreshToken },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${session?.accessToken}`,
    //     },
    //   }
    // );
    // console.log("api refresh res", res);
    // console.log("session", session);
    // if (session) {
    //   await update({
    //     ...session,
    //     accessToken: res?.data.accessToken,
    //     // refreshToken: res?.data.refreshToken,
    //   });
    //   // update client session at the same time
    //   session.accessToken = res?.data.accessToken;
    //   session.refreshToken = res?.data.refreshToken;
    //   session.userId = decodedAccessToken.sub;
    //   session.username = decodedAccessToken.username;
    //   session.name = decodedAccessToken.name;
    //   session.surname = decodedAccessToken.surname;
    //   session.expRefreshToken = decodedRefreshToken.exp as number;
    // } else {
    // }
  };

  useEffect(() => {
    if (status === "authenticated") {
      console.log("authenticated");
      console.log("session in authenticated", session);
      refreshToken;
    }
  }, [status]);

  return refreshToken;
};
