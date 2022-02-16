import { registerAs } from '@nestjs/config';

export default registerAs('proxy', () => ({
  host: process.env.PROXY_HOST,
  port: parseInt(process.env.PROXY_PORT),
  auth: {
    username: process.env.PROXY_USERNAME,
    password: process.env.PROXY_PASSWORD,
  },
}));
