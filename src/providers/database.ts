import { Service } from 'typedi';
import { createConnection, Connection } from 'typeorm';
import databaseConfig from '../config/database';
import { OnApplicationShutdown, Provider } from '../contracts';

@Service({ id: 'app' })
export class DatabaseProvider implements Provider, OnApplicationShutdown {
  private connection: Connection;

  async register(): Promise<void> {
    this.connection = await createConnection(databaseConfig);
  }

  async onShutdown(): Promise<void> {
    await this.connection.close();
  }
}
