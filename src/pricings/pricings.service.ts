import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Pricing } from 'src/models/pricing.entity';

@Injectable()
export class PricingsService extends TypeOrmCrudService<Pricing> {
  constructor(@InjectRepository(Pricing) repo) {
    super(repo);
  }
}
