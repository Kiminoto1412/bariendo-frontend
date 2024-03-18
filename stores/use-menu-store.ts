import { IMenu } from "@/interface/menus";
import { IPermissions } from "@/interface/permissions";
import { create } from "zustand";

interface IMenuStore {
  permissions: IPermissions;
  menus: IMenu[];
  setMenuData: (menuData: IMenu[]) => void;
  setPermissions: (permissionsData: IPermissions) => void;
}

export const useMenuStore = create<IMenuStore>((set) => ({
  permissions: {} as IPermissions,
  menus: [] as IMenu[],
  setMenuData: (menuData) =>
    set((prev) => ({
      ...prev,
      menus: menuData,
    })),
  setPermissions: (permissionsData) =>
    set((prev) => ({
      ...prev,
      permissions: permissionsData,
    })),
}));
