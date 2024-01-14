import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.config";
import { userRouter } from "./user/user.router";
import { checkUserExistenceMiddleware } from "./middlewares/common.middleware";
import { expressjwt } from "express-jwt";
import { authRouter } from "./auth/auth.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", authRouter);

app.use(
  "/user",
  expressjwt({ algorithms: ["HS256"], secret: process.env.SECRET as string }),
  checkUserExistenceMiddleware,
  userRouter
);

app.listen(PORT, async () => {
  await connectToDB();
  console.log("server listening on port " + PORT);
});
