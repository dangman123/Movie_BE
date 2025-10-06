import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  username: string;
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;
}
