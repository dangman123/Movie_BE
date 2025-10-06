import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPasswordHelper } from 'src/common/helpers/util';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  IsEmailExist = async (email: string) => {
    const user = await this.userRepository.exists({
      where: { email },
    });
    if (user) {
      return true;
    }
    return false;
  };
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
  async handleRegister(register: CreateAuthDto) {
    try {
      const { username, email, password } = register;

      const isExist = await this.IsEmailExist(email);
      if (isExist) {
        throw new BadRequestException(
          `Email ${email} đã tồn tại. Vui lòng sử dụng email khác.`,
        );
      }

      const hashedPassword = await hashPasswordHelper(password);
      const verificationCode = uuidv4();

      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
        isActive: false,
      });

      const savedUser = await this.userRepository.save(user);
      return {
        userID: savedUser.userID,
        message:
          'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Có lỗi xảy ra khi đăng ký tài khoản.',
      );
    }
  }
}
