import 'reflect-metadata';
import express, { Application } from 'express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { useExpressServer } from 'routing-controllers';
import HelloWorldController from './modules/hello-world/hello-world.controller';

dotenv.config({
  path: join(__dirname, '../.env'),
});

const app: Application = express();
const port = process.env.PORT || 3000;

useExpressServer(app, {
  controllers: [
    HelloWorldController,
  ],
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
