import {UserWithoutPasswordType} from "./userWithoutPassword.type";

export type UserType  = UserWithoutPasswordType & {
  password: string;
  refreshTokenVersion: string;
};