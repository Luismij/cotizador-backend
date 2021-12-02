import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import typeormConfig from './config/typeorm/typeorm.config';
import authConfig from './config/auth/auth.config';
import multerConfig from './config/multer/multer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeormConfig, authConfig, multerConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('typeorm'),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
