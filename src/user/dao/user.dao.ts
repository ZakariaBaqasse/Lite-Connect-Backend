import User from "../models/user.model";
import { UserSignupDTO, UserUpdateDTO } from "../../types/user.types";

export const createUser = async (userInfo: UserSignupDTO) => {
  let user = new User({ ...userInfo });
  user = await user.save();
  return user.toObject();
};

export const findUserById = async (id: number) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user?.toObject();
};

export const updateUser = async (user: UserUpdateDTO, email: string) => {
  return await User.findOneAndUpdate({ email }, { ...user });
};
