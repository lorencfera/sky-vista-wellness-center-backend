import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyEmail(userId: string, verificationToken: string): Promise<User> {
    try {
      const user = await this.userService.findById(userId);

      if (user.verificationToken === verificationToken) {
        user.verified = true;
        const updatedUser = await this.userService.changeVerifyToTrue(userId);
        return updatedUser;
      } else if (user.verificationToken !== verificationToken) {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    let isValid;
    if (user) {
      isValid = await bcrypt.compare(password, user.password);
    }
    if (isValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    if (!user.verified) throw Error('Verify Email');
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
