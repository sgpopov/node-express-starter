import 'dotenv/config';
import 'reflect-metadata';
import { join } from 'path';
import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { Container } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';

const app: Application = express();

app.use(helmet());

useContainer(Container);

useExpressServer(app, {
  cors: true,
  controllers: [
    join(__dirname, './modules/**/*.controller.ts'),
  ],
});

app.use(compression());

export default app;
