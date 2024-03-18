import { create } from "zustand";
import { SortInfo } from "@/interface/sort";
import { ISearchOptions } from "@/components/Layout/ModalSearchBox";

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

export interface IModalTableStore {
  modalSearch: { [key: string]: string };
  modalSortInfo: SortInfo;
  modalSelectKey: number;
  modalPage: number;
  modalPageSize: number;
  modalTotal: number;
  modalDataTable: ITableListing | null;
  modalSearchOptions: ISearchOptions[];
  modalSelectedRow: {
    [key: string]: string | boolean | number | undefined;
  } | null;
  setModalSearch: (stateKey: string, value: string) => void;
  setModalSortInfo: (obj: SortInfo) => void;
  setModalPage: (value: number) => void;
  setModalPageSize: (value: number) => void;
  setModalTotal: (value: number) => void;
  setModalClearSearch: () => void;
  setModalDataTable: (updateDataTable: ITableListing | null) => void;
  setModalSearchOptions: (updateSearchOption: ISearchOptions[]) => void;
  setModalSelectedRow: (obj: {
    [key: string]: string | boolean | number | undefined;
  }) => void;
  setClearAllModalStore: () => void;
  setClearAllModalStoreExceptSelectRow: () => void;
}

export const useModalTableStore = create<IModalTableStore>((set) => ({
  modalSearch: {},
  modalSortInfo: {
    columnName: "",
    sortOrder: "",
  },
  modalSelectKey: +new Date(),
  modalPage: 0,
  modalPageSize: 20,
  modalTotal: 0,
  modalDataTable: null,
  modalSearchOptions: [],
  modalSelectedRow: null,
  setModalSearch: (stateKey: string, value: string) =>
    set((prev) => ({
      ...prev,
      modalSearch: {
        ...prev.modalSearch,
        [stateKey]: value,
      },
    })),
  setModalSortInfo: (obj: SortInfo) =>
    set((prev) => ({
      ...prev,
      modalSortInfo: obj,
    })),
  setModalPage: (value: number) =>
    set((prev) => ({
      ...prev,
      modalPage: value,
    })),
  setModalPageSize: (value: number) =>
    set((prev) => ({
      ...prev,
      modalPageSize: value,
    })),
  setModalTotal: (value: number) =>
    set((prev) => ({
      ...prev,
      modalTotal: value,
    })),
  setModalClearSearch: () =>
    set((prev) => ({
      ...prev,
      modalSearch: {},
      modalSelectKey: +new Date(),
    })),
  setModalDataTable: (updateDataTable: any) =>
    set((prev) => ({
      ...prev,
      modalDataTable: updateDataTable,
    })),
  setModalSearchOptions: (value: any) =>
    set((prev) => ({
      ...prev,
      modalSearchOptions: value,
    })),
  setModalSelectedRow: (obj: {
    [key: string]: string | boolean | number | undefined;
  }) =>
    set((prev) => ({
      ...prev,
      modalSelectedRow: obj,
    })),
  setClearAllModalStore: () =>
    set({
      modalSearch: {},
      modalSortInfo: {
        columnName: "",
        sortOrder: "",
      },
      modalSelectKey: +new Date(),
      modalPage: 0,
      modalPageSize: 20,
      modalTotal: 0,
      modalDataTable: null,
      modalSearchOptions: [],
      modalSelectedRow: null,
    }),
  setClearAllModalStoreExceptSelectRow: () =>
    set((prev) => ({
      ...prev,
      modalSearch: {},
      modalSortInfo: {
        columnName: "",
        sortOrder: "",
      },
      modalSelectKey: +new Date(),
      modalPage: 0,
      modalPageSize: 20,
      modalTotal: 0,
      modalDataTable: null,
      modalSearchOptions: [],
    })),
}));
