import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfileController } from './profile.controller';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        config.get<MulterModuleOptions>('multer'),
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController, ProfileController],
})
export class UsersModule {}
