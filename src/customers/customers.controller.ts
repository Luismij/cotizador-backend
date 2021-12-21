import { Controller, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Customer } from 'src/models/customer.entity';
import { User } from 'src/models/user.entity';
import { imageFileFilter } from 'src/utils/multerFilters';
import { CustomersService } from './customers.service';

@Crud({
  model: {
    type: Customer,
  },
  query: {
    persist: ['createdAt'],
  },
  routes: {
    createOneBase: {
      interceptors: [
        FileInterceptor('logo', {
          fileFilter: imageFileFilter,
        }),
      ],
    },
    updateOneBase: {
      interceptors: [
        FileInterceptor('logo', {
          fileFilter: imageFileFilter,
        }),
      ],
    },
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

  get base(): CrudController<Customer> {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Customer,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo) {
      const { destination, filename } = logo;
      const path = destination.replace('./public', '');
      dto.logo = `${path}/${filename}`;
    }
    if (dto.logo === 'null') {
      dto.logo = null;
    }
    return this.base.createOneBase(req, dto);
  }

  @Override('updateOneBase')
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Customer,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo) {
      const { destination, filename } = logo;
      const path = destination.replace('./public', '');
      dto.logo = `${path}/${filename}`;
    }
    if (dto.logo === 'null') {
      dto.logo = null;
    }
    return this.base.updateOneBase(req, dto);
  }
}
