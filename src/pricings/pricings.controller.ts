import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Pricing } from 'src/models/pricing.entity';
import { User } from 'src/models/user.entity';
import { PricingsService } from './pricings.service';

@Crud({
  model: {
    type: Pricing,
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    user: user,
  }),
  filter: (user: User) => ({
    'Pricing.userId': user.id,
  }),
})
@UseGuards(JwtAuthGuard)
@Controller('pricings')
export class PricingsController implements CrudController<Pricing> {
  constructor(public service: PricingsService) {}
}
