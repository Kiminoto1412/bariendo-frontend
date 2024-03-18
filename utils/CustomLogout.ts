import { signOut } from "next-auth/react";
import { removeDataInLocalStorage } from "./HandleLocalStorage";
export const customLogout = () => {
  removeDataInLocalStorage("menus");
  removeDataInLocalStorage("permissions");
  signOut();
};
