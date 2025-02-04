import { UserRole } from "./user.constant";

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isActive: boolean;
  }
  export type TUserRole =  keyof typeof UserRole;