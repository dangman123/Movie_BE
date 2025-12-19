import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePasswordHelper } from '../common/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Username or password không hợp lệ');
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Usernasmee or password không hợp lệ');
    }
    if (!user || !isValidPassword) {
      return null;
    }
    return user;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.userID };
    const userData = {
      userID: user.userID,
      email: user.email,
      fullName: user.fullName,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: userData,
    };
  }
  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  };
}
