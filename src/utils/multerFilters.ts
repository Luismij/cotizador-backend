import { BadRequestException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';

export const imageFileFilter: MulterModuleOptions['fileFilter'] = (
  req,
  file,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    return callback(
      new BadRequestException('Solo puedes subir imágenes'),
      false,
    );
  }
  callback(null, true);
};
