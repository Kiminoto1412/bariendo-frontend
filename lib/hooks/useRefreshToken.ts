"use client";

import { useMenuStore } from "@/stores/use-menu-store";
import axios from "../axios";
import { useSession } from "next-auth/react";
import { getDataFromLocalStorage } from "@/utils/HandleLocalStorage";
import { useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { customLogout } from "@/utils/CustomLogout";

export const useRefreshToken = () => {
  const { data: session, update, status } = useSession();
  const { menus, setMenuData } = useMenuStore();
  const refreshToken = async () => {
    // const res = await axios.post(
    //   "/auth/refresh",
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Refresh ${session?.backendTokens.refreshToken}`,
    //     },
    //   }
    // );
    // console.log(
    //   "session?.backendTokens.accessToken",
    //   session?.backendTokens.accessToken
    // );
    // console.log(121212, "session", session);
    // console.log(2222, "session.refreshToken", session?.refreshToken);
    const res = await axios.post(
      "/auth/refresh-tokens",
      { refreshToken: session?.refreshToken },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    // console.log("api refresh res", res);
    // console.log("session", session);

    console.log(3333);
    if (session) {
      // dev

      // prod
      // update server session
      // console.log("refresh session", session);
      console.log(4444, "new ses", {
        ...session,
        accessToken: res?.data.accessToken,
        refreshToken: res?.data.refreshToken,
      });
      await update({
        ...session,
        accessToken: res?.data.accessToken,
        // refreshToken: res?.data.refreshToken,
      });
      console.log(5555, "after update", session);
      // update client session at the same time
      session.accessToken = res?.data.accessToken;
      session.refreshToken = res?.data.refreshToken;
      session.userId = decodedAccessToken.sub;
      session.username = decodedAccessToken.username;
      session.name = decodedAccessToken.name;
      session.surname = decodedAccessToken.surname;
      session.expRefreshToken = decodedRefreshToken.exp as number;
    } else {
      customLogout();
    }
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
