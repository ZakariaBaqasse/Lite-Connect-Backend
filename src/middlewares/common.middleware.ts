import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import * as userDAO from "../user/dao/user.dao";
import { validationResult } from "express-validator";

export const checkUserExistenceMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userEmail = request.auth?.email;
    const user = await userDAO.findUserByEmail(userEmail);
    if (!user) {
      return response
        .status(404)
        .json({ message: `No user with this email ${userEmail} exists` });
    }
    next();
  } catch (error) {
    const msg = `Error in checkUserExistenceMiddleware: error ${error}`;
    console.log(msg);
  }
};

export const checkSchemaValidityMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(422)
        .json({
          message: "the information is incorrect",
          errors: errors.array(),
        });
    }
    next();
  } catch (error) {
    const msg = `Error in checkSchemaValidityMiddleware: error ${error}`;
    console.log(msg);
  }
};
