import { Document } from "mongoose";

export type UserUpdateDTO = Partial<
  Document & {
    username: string;
    email: string;
    password: string;
    bio: string;
    profileImage: string;
    coverImage: string;
  }
>;

export type UserSignupDTO = {
  username: string;
  email: string;
  password: string;
};
