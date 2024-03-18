import { IGetUserStatusActiveInActiveObject } from "@/api/masterManagement/lookup/lookupApi";
import {
  IUserRoleListing,
  IUserRoleRowOfTable,
  userRoleListingConstant,
} from "@/components/Tables/constant/UserRoleListing";
import { SortInfo } from "@/interface/sort";
import { create } from "zustand";

interface ISearchState {
  userGroupId?: number;
  userRoleId?: number;
  statusId?: number;
}

interface IUserGroupDropdown {
  lookupdetailId: number;
  lookupValue: string;
}

interface IUserRoleStore {
  search: ISearchState;
  sortInfo: SortInfo;
  page: number;
  pageSize: number;
  total: number;
  dataTable: IUserRoleListing;
  groupData: IUserGroupDropdown[];
  userRoleData: IUserRoleRowOfTable[];
  statusData: IGetUserStatusActiveInActiveObject[];
  setSearch: (stateKey: string, value: string) => void;
  setSortInfo: (obj: SortInfo) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setTotal: (value: number) => void;
  setClearSearch: () => void;
  setDataTable: (updateDataTable: IUserRoleListing) => void;
  setGroupData: (value: IUserGroupDropdown[]) => void;
  setUserRoleData: (value: IUserRoleRowOfTable[]) => void;
  setStatusData: (value: IGetUserStatusActiveInActiveObject[]) => void;
}

export const useUserRoleStore = create<IUserRoleStore>((set) => ({
  search: {},
  sortInfo: {
    columnName: "",
    sortOrder: "",
  },
  page: 0,
  pageSize: 20,
  total: 10,
  dataTable: userRoleListingConstant,
  groupData: [],
  userRoleData: [],
  statusData: [],
  setSearch: (stateKey: string, value: string) =>
    set((prev) => ({
      ...prev,
      search: {
        ...prev.search,
        [stateKey]: value,
      },
    })),
  setSortInfo: (obj: SortInfo) =>
    set((prev) => ({
      ...prev,
      sortInfo: obj,
    })),
  setPage: (value: number) =>
    set((prev) => ({
      ...prev,
      page: value,
    })),
  setPageSize: (value: number) =>
    set((prev) => ({
      ...prev,
      pageSize: value,
    })),
  setTotal: (value: number) =>
    set((prev) => ({
      ...prev,
      total: value,
    })),
  setClearSearch: () =>
    set((prev) => ({
      ...prev,
      search: {
        userGroupId: undefined,
        userRoleId: undefined,
        statusId: undefined,
      },
    })),

  setDataTable: (updateDataTable: IUserRoleListing) =>
    set((prev) => ({
      ...prev,
      dataTable: updateDataTable,
    })),
  setGroupData: (value: IUserGroupDropdown[]) =>
    set((prev) => ({
      ...prev,
      groupData: value,
    })),
  setUserRoleData: (value: IUserRoleRowOfTable[]) =>
    set((prev) => ({
      ...prev,
      userRoleData: value,
    })),
  setStatusData: (value: IGetUserStatusActiveInActiveObject[]) =>
    set((prev) => ({
      ...prev,
      statusData: value,
    })),
}));
