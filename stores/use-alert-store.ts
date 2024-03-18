import { create } from "zustand";

export type AlertType = "loginOrganization" | "changePassword";

interface AlertData {
  // server?: Server;
  // channel?: Channel;
  // channelType?: ChannelType;
  // apiUrl?: string;
  // query?: Record<string, any>;
}

interface AlertStore {
  type: AlertType | null;
  data: AlertData;
  isOpenAlert: boolean;
  onOpenAlert: (type: AlertType, data?: AlertData) => void;
  onCloseAlert: () => void;
}

export const useAlert = create<AlertStore>((set) => ({
  type: null,
  data: {},
  isOpenAlert: false,
  onOpenAlert: (type, data = {}) => set({ isOpenAlert: true, type, data }),
  onCloseAlert: () => set({ type: null, isOpenAlert: false }),
}));
