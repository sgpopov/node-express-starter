import { createHttpTerminator, HttpTerminator, HttpTerminatorConfig } from 'http-terminator';
import { Server } from 'http';
import { Container } from 'typedi';
import app from './app';
import providers from './providers';
import { OnApplicationShutdown, Provider } from './contracts';

class Application {
  private server: Server;

  private port: number | string;

  private terminator: HttpTerminator;

  constructor() {
    this.port = process.env.PORT || 3000;
  }

  public boot() {
    this.registerProviders();

    this.server = app.listen(this.port, () => {
      console.log(`Server is up and running on port ${this.port}`);
    });

    const serverConfig: HttpTerminatorConfig = {
      server: this.server,
    };

    this.terminator = createHttpTerminator(serverConfig);

    this.registerErrorHandlers();
  }

  private registerErrorHandlers() {
    const shutdown: () => void = async () => {
      this.shutdownProviders();

      await this.terminator.terminate();
    };

    const unexpectedErrorHandler = (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof this.port === 'string'
        ? `Pipe ${this.port}`
        : `Port ${this.port}`;

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
  }

  private registerProviders() {
    Container.import(providers);

    const services = Container.getMany('app');

    services.forEach((service: any) => {
      if (!service || typeof (service as Provider).register !== 'function') {
        return;
      }

      (service as Provider).register();
    });
  }

  private shutdownProviders() {
    const services = Container.getMany('app');

    services.forEach((service: any) => {
      if (!service || typeof (service as OnApplicationShutdown).onShutdown !== 'function') {
        return;
      }

      (service as OnApplicationShutdown).onShutdown();
    });
  }
}

const application = new Application();

application.boot();
