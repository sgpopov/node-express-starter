/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { createHttpTerminator, HttpTerminator, HttpTerminatorConfig } from 'http-terminator';
import { join } from 'path';
import { Server } from 'http';
import app from './app';

dotenv.config({
  path: join(__dirname, '../.env'),
});

const port = process.env.PORT || 3000;

const server: Server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const serverConfig: HttpTerminatorConfig = {
  server,
};

const terminator: HttpTerminator = createHttpTerminator(serverConfig);

const shutdown: () => void = async () => {
  await terminator.terminate();
};

const unexpectedErrorHandler = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      shutdown();
      break;

    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      shutdown();
      break;

    default:
      throw error;
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGINT', () => {
  console.log('\nGot SIGINT. Graceful shutdown.');

  shutdown();
});

process.on('SIGTERM', () => {
  console.log('\nGot SIGTERM. Graceful shutdown.');

  shutdown();
});
