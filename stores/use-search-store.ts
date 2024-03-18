import { create } from "zustand";
import { SortInfo } from "@/interface/sort";
import { ISearchOptions } from "@/components/Layout/SearchBox";

export interface ITableListing {
  header: string;
  columns: {
    name: string;
    sortField?: string;
    url?: string;
    type?: string;
    selectors?: ISearchOptions[];
    state?: string;
    valueState?: string;
    valueKey?: string;
    renderKey?: string;
    defaultValue?: string;
  }[];
  rows: { [key: string]: string | boolean | number | undefined }[];
  isCheckAll?: boolean;
}

export interface ISearchStore {
  search: { [key: string]: string };
  sortInfo: SortInfo;
  selectKey: number;
  page: number;
  pageSize: number;
  total: number;
  dataTable: ITableListing | null;
  searchOptions: ISearchOptions[];
  setSearch: (stateKey: string, value: string) => void;
  setSortInfo: (obj: SortInfo) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setTotal: (value: number) => void;
  setClearSearch: () => void;
  setDataTable: (updateDataTable: ITableListing | null) => void;
  setSearchOptions: (updateSearchOption: ISearchOptions[]) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  search: {},
  sortInfo: {
    columnName: "",
    sortOrder: "",
  },
  selectKey: +new Date(),
  page: 0,
  pageSize: 20,
  total: 0,
  dataTable: null,
  searchOptions: [],
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
      search: {},
      selectKey: +new Date(),
    })),
  setDataTable: (updateDataTable: any) =>
    set((prev) => ({
      ...prev,
      dataTable: updateDataTable,
    })),
  setSearchOptions: (value: any) =>
    set((prev) => ({
      ...prev,
      searchOptions: value,
    })),
}));
