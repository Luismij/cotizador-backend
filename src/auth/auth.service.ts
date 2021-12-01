import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(username);
      if (user) {
        const matches = await user.comparePassword(pass);
        if (matches) {
          const { password, internalComment, createdAt, updatedAt, ...result } =
            user;
          return result;
        }
      }
    } catch (error) {
      return null;
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
