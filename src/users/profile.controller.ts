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
import { imageFileFilter } from 'src/utils/multerFilters';

import { User } from '../models/user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase'],
    updateOneBase: {
      interceptors: [
        FileInterceptor('logo', {
          fileFilter: imageFileFilter,
        }),
      ],
    },
  },
  params: {
    id: {
      primary: true,
      disabled: true,
    },
  },
  query: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: User) => ({
    id: user.id,
  }),
})
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override('updateOneBase')
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo) {
      console.log('logo', logo);
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
