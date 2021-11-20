import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'cotizador',
  password: process.env.DB_PASS || 'cotizador',
  database: process.env.DB_NAME || 'cotizador',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: !!process.env.DB_SYNC || false,
  migrationsRun: true,
  logging: true,
  migrations: ['dist/migrations/**/*{.ts, .js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormConfig;
