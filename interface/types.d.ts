import { IUserOrganization } from "@/lib/next-auth";

export type User = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  specialist: string;
  role: string;
  userOrganizations: IUserOrganization[];
};
