import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: !!process.env.DB_SYNC || false,
  migrationsRun: false,
  logging: true,
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormConfig;
