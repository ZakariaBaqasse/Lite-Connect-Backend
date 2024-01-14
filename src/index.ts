import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";


dotenv.config();


if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
