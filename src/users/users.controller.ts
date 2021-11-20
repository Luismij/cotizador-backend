import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
    },
    email: {
      type: 'string',
    },
  },
  query: {
    exclude: ['password'],
    persist: ['createdAt'],
  },
})
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
