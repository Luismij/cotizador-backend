import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        config.get<MulterModuleOptions>('multer'),
    }),
  ],
  providers: [CustomersService],
  exports: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
