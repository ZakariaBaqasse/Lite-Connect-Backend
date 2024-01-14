import type { Request } from "express-jwt";
import * as userDAO from "../dao/user.dao";
import { Response } from "express";
import { UserUpdateDTO } from "../../types/user.types";

export const updateUserInfos = async (request: Request, response: Response) => {
  try {
    const userInfos: UserUpdateDTO = request.body;
    const userEmail = request.auth?.email;
    const updatedUser = await userDAO.updateUser(userInfos, userEmail);
    return response.status(200).json(updatedUser);
  } catch (error: any) {
    return response
      .status(500)
      .json({ message: "There is a problem with the server. Try again later" });
  }
};
