import { registerAs } from '@nestjs/config';

export default registerAs('cataprom', () => ({
  apiUrl: process.env.CATAPROM_API_URL,
}));
