import { Controller, UploadedFile } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';

import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ['password'],
    persist: ['createdAt'],
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
  get base(): CrudController<User> {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
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
    @ParsedBody() dto: User,
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
