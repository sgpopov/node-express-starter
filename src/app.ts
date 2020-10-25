import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { useExpressServer } from 'routing-controllers';
import HelloWorldController from './modules/hello-world/hello-world.controller';

const app: Application = express();

app.use(helmet());

useExpressServer(app, {
  cors: true,
  controllers: [
    HelloWorldController,
  ],
});

app.use(compression());

export default app;
