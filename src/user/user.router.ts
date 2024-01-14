import { Router } from "express";
import { checkSchema } from "express-validator";
import { checkSchemaValidityMiddleware } from "../middlewares/common.middleware";
import { updateUserInfos } from "./services/user.service";

export const userRouter = Router();
const updateUserInfosSchema = {
  username: {
    isString: true,
    errorMessage: "Username format is invalid",
  },
  bio: {
    isString: true,
    errorMessage: "Email Format is invalid",
  },
};

userRouter.put(
  "/update-infos",
  checkSchema(updateUserInfosSchema),
  checkSchemaValidityMiddleware,
  updateUserInfos
);
