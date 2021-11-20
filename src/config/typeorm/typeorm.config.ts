import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormConfig from './orm.config';

export default registerAs(
  'typeorm',
  () =>
    ({
      ...ormConfig,
      // Nestjs specific
      keepConnectionAlive: true,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
);
