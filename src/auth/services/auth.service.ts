import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { createUser, findUserByEmail } from "../../user/dao/user.dao";
import { hashPassword } from "../../utils/auth.utils";
import { UserSignupDTO } from "../../types/user.types";

export async function signupAction(request: Request, response: Response) {
  try {
    const userWithSameEmail = await findUserByEmail(request.body.email);

    if (userWithSameEmail) {
      return response.status(401).json({
        message: "A user with the same email already exists",
      });
    }
    const user: UserSignupDTO = { ...request.body };
    user.password = await hashPassword(user.password);
    const { password, _id, ...createdUser } = await createUser(user);
    const token = jwt.sign(createdUser, process.env.SECRET as string);
    return response.status(201).json({ user: createdUser, token });
  } catch (error) {
    console.log(error);
    return response.status(500).json("An error occured in the server");
  }
}

export async function loginAction(request: Request, response: Response) {
  try {
    const user = await findUserByEmail(request.body.email);

    if (!user || !compareSync(request.body.password, user.password!)) {
      return response.status(401).json({ message: "Wrong credentials" });
    }

    const { password, _id, ...payload } = user;

    const token = jwt.sign(payload, process.env.SECRET as string);
    return response.status(200).json({ user: payload, token });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
}

export async function logoutAction(request: Request, response: Response) {
  return response.status(200).json({ message: "You are logged out" });
}
