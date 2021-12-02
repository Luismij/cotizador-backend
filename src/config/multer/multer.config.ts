import { registerAs } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const multerOptions: MulterModuleOptions = {
  dest: './public/uploads',
  storage: diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const timestamp = new Date().valueOf();
      const name = file.originalname.split('.')[0];
      return cb(null, `${name}_${timestamp}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 10000000,
  },
};

export default registerAs('multer', () => multerOptions);
