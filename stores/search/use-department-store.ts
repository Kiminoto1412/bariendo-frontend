import { IGetUserStatusActiveInActiveObject } from "@/api/masterManagement/lookup/lookupApi";
import {
  IDepartmentListing,
  IDepartmentRowOfTable,
  departmentListingConstant,
} from "@/components/Tables/constant/DepartmentListing";
import { SortInfo } from "@/interface/sort";
import { create } from "zustand";

interface ISearchState {
  userGroupId?: number;
  departmentId?: number;
  statusId?: number;
}

interface IDepartmentDropdown {
  lookupdetailId: number;
  lookupValue: string;
}

interface IDepartmentStore {
  search: ISearchState;
  sortInfo: SortInfo;
  page: number;
  pageSize: number;
  total: number;
  dataTable: IDepartmentListing;
  groupData: IDepartmentDropdown[];
  departmentData: IDepartmentRowOfTable[];
  statusData: IGetUserStatusActiveInActiveObject[];
  setSearch: (stateKey: string, value: string) => void;
  setSortInfo: (obj: SortInfo) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setTotal: (value: number) => void;
  setClearSearch: () => void;
  setDataTable: (updateDataTable: IDepartmentListing) => void;
  setGroupData: (value: IDepartmentDropdown[]) => void;
  setDepartmentData: (value: IDepartmentRowOfTable[]) => void;
  setStatusData: (value: IGetUserStatusActiveInActiveObject[]) => void;
}

export const useDepartmentStore = create<IDepartmentStore>((set) => ({
  search: {},
  sortInfo: {
    columnName: "",
    sortOrder: "",
  },
  page: 0,
  pageSize: 20,
  total: 10,
  dataTable: departmentListingConstant,
  groupData: [],
  departmentData: [],
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
        departmentId: undefined,
        statusId: undefined,
      },
    })),

  setDataTable: (updateDataTable: IDepartmentListing) =>
    set((prev) => ({
      ...prev,
      dataTable: updateDataTable,
    })),
  setGroupData: (value: IDepartmentDropdown[]) =>
    set((prev) => ({
      ...prev,
      groupData: value,
    })),
  setDepartmentData: (value: IDepartmentRowOfTable[]) =>
    set((prev) => ({
      ...prev,
      departmentData: value,
    })),
  setStatusData: (value: IGetUserStatusActiveInActiveObject[]) =>
    set((prev) => ({
      ...prev,
      statusData: value,
    })),
}));
