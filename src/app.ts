import 'reflect-metadata';
import express, { Application } from 'express';
import compression from 'compression';
import { useExpressServer } from 'routing-controllers';
import HelloWorldController from './modules/hello-world/hello-world.controller';

const app: Application = express();

useExpressServer(app, {
  controllers: [
    HelloWorldController,
  ],
});

app.use(compression());

export default app;
