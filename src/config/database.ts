import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import app from './app';

const enableSecureConnection = !!process.env.DB_SECURE_CONNECTION || false;

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  logging: app.debug,

  ...enableSecureConnection && { ssl: true },

  entities: [
    join(__dirname, '../modules/**/*/*.entity{.ts,.js}'),
  ],

  migrations: [
    join(__dirname, '../database/migrations/*{.ts,.js}'),
  ],

  // Indicates if database schema should be auto created on every application launch.
  // Don't use this in production - otherwise you can lose production data!
  synchronize: false,

  cli: {
    migrationsDir: join(__dirname),
  },
};

export default config;
