// create interface for session becaue that should have structure as backend
import { IPermissions } from "@/interface/permissions";
import NextAuth from "next-auth";

// export interface IRole {
//   userRoleId: string;
//   userRoleName: string;
// }

// export interface DecodedAccessToken {
//   sub: number;
//   username: string;
//   name: string;
//   surname: string;
//   deviceId: string;
//   iat: number;
//   exp: number;
//   aud: string;
//   iss: string;
// }

// declare module "next-auth" {
//   interface Session {
//     accessToken: string;
//     refreshToken: string;
//     userId: number;
//     username: string;
//     name: string;
//     surname: string;
//     expRefreshToken: number;
//     hasResetPassword: boolean;

//     // already selected role
//     // permissions?: IPermissions;
//     // menus?: IMenu[];

//     // didnt selected role
//     roles?: IRole[];
//     userRoleId: string;
//     userRoleName: string;
//   }
//   interface User {
//     accessToken: string;
//     refreshToken: string;
//     roles?: IRole[];
//   }
// }

// change type of jwt from next-auth
// import { JWT } from "next-auth/jwt";

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken: string;
//     refreshToken: string;
//     userId: number;
//     username: string;
//     name: string;
//     surname: string;
//     expRefreshToken: number;
//     hasResetPassword: boolean;

//     // already selected role
//     // permissions?: IPermissions;
//     // menus?: IMenu[];

//     // didnt selected role
//     roles?: IRole[];
//     userRoleId: string;
//     userRoleName: string;
//   }
// }

// new bariendo

export interface IUserOrganization {
  id: number;
  organization: IOrganization;
}

export interface IOrganization {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  specialist: string;
  role: string;
  userOrganizations: IUserOrganization[];
  organization?: IOrganization;
}

export interface IPayload {
  accessToken: string;
  user: IUser;
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: IUser;
  }
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: IUser;
    // refreshToken: string;
    // expRefreshToken: number;
  }
}
