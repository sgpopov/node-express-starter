import express, { Application, Request, Response } from 'express';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: join(__dirname, '../.env'),
});

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({
    greeting: 'Hello',
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
