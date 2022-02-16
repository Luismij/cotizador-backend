import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { PricingsModule } from './pricings/pricings.module';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import typeormConfig from './config/typeorm/typeorm.config';
import authConfig from './config/auth/auth.config';
import multerConfig from './config/multer/multer.config';
import catapromConfig from './config/cataprom/cataprom.config';
import proxyConfig from './config/proxy/proxy.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        typeormConfig,
        authConfig,
        multerConfig,
        catapromConfig,
        proxyConfig,
      ],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('typeorm'),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    CustomersModule,
    PricingsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
