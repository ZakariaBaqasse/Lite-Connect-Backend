import { Router } from "express";
import * as dotenv from "dotenv";
import {
  loginAction,
  logoutAction,
  signupAction,
} from "./services/auth.service";
import { checkSchema } from "express-validator";
import { expressjwt } from "express-jwt";
import {
  checkSchemaValidityMiddleware,
  checkUserExistenceMiddleware,
} from "../middlewares/common.middleware";

dotenv.config();

export const authRouter = Router();
const signupValidationSchema = {
  username: {
    isString: true,
    errorMessage: "Username format is invalid",
  },
  email: {
    isEmail: true,
    errorMessage: "Email Format is invalid",
  },
  password: {
    isString: true,
    errorMessage: "Password format is invalid",
  },
};

const loginValidationSchema = {
  email: {
    isEmail: true,
    errorMessage: "Email Format is invalid",
  },
  password: {
    isString: true,
    errorMessage: "Password format is invalid",
  },
};

authRouter.post(
  "/signup",
  checkSchema(signupValidationSchema),
  checkSchemaValidityMiddleware,
  signupAction
);
authRouter.post(
  "/login",
  checkSchema(loginValidationSchema),
  checkSchemaValidityMiddleware,
  loginAction
);
authRouter.get(
  "/logout",
  expressjwt({ secret: process.env.SECRET as string, algorithms: ["HS256"] }),
  checkUserExistenceMiddleware,
  logoutAction
);
