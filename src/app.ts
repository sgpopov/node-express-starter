import express, { Application, Request, Response } from "express";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config({
  path: join(__dirname, "../.env"),
});

import { app as appConfig } from "./config/app";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    greeting: "Hello",
  });
});

app.listen(appConfig.port, () => console.log(`Server is up and running on port ${appConfig.port}`));
