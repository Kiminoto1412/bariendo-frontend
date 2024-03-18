import { IGetUserStatusActiveInActiveObject } from "@/api/masterManagement/lookup/lookupApi";
import {
  ITeamListing,
  ITeamRowOfTable,
  teamListingConstant,
} from "@/components/Tables/constant/TeamListing";
import { SortInfo } from "@/interface/sort";
import { create } from "zustand";

interface ISearchState {
  userGroupId?: number;
  teamId?: number;
  statusId?: number;
}

interface ITeamDropdown {
  lookupdetailId: number;
  lookupValue: string;
}

interface ITeamStore {
  search: ISearchState;
  sortInfo: SortInfo;
  page: number;
  pageSize: number;
  total: number;
  dataTable: ITeamListing;
  groupData: ITeamDropdown[];
  teamData: ITeamRowOfTable[];
  statusData: IGetUserStatusActiveInActiveObject[];
  setSearch: (stateKey: string, value: string) => void;
  setSortInfo: (obj: SortInfo) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setTotal: (value: number) => void;
  setClearSearch: () => void;
  setDataTable: (updateDataTable: ITeamListing) => void;
  setGroupData: (value: ITeamDropdown[]) => void;
  setTeamData: (value: ITeamRowOfTable[]) => void;
  setStatusData: (value: IGetUserStatusActiveInActiveObject[]) => void;
}

export const useTeamStore = create<ITeamStore>((set) => ({
  search: {},
  sortInfo: {
    columnName: "",
    sortOrder: "",
  },
  page: 0,
  pageSize: 20,
  total: 10,
  dataTable: teamListingConstant,
  groupData: [],
  teamData: [],
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
        teamId: undefined,
        statusId: undefined,
      },
    })),

  setDataTable: (updateDataTable: ITeamListing) =>
    set((prev) => ({
      ...prev,
      dataTable: updateDataTable,
    })),
  setGroupData: (value: ITeamDropdown[]) =>
    set((prev) => ({
      ...prev,
      groupData: value,
    })),
  setTeamData: (value: ITeamRowOfTable[]) =>
    set((prev) => ({
      ...prev,
      teamData: value,
    })),
  setStatusData: (value: IGetUserStatusActiveInActiveObject[]) =>
    set((prev) => ({
      ...prev,
      statusData: value,
    })),
}));
