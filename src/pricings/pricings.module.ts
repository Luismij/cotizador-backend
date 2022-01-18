import { Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsController } from './pricings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from 'src/models/pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pricing])],
  providers: [PricingsService],
  controllers: [PricingsController],
  exports: [PricingsService],
})
export class PricingsModule {}
