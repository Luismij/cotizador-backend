import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Customer } from 'src/models/customer.entity';
import { User } from 'src/models/user.entity';
import { CustomersService } from './customers.service';

@Crud({
  model: {
    type: Customer,
  },
  query: {
    persist: ['createdAt'],
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    user: user,
  }),
  filter: (user: User) => ({
    'Customer.userId': user.id,
  }),
})
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController implements CrudController<Customer> {
  constructor(public service: CustomersService) {}
}
