import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Gender {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MinLength(3, { message: 'Tên phải có ít nhất 3 ký tự' })
  username: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @Matches(/^(0|\+84)[0-9]{9}$/, {
    message: 'Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)',
  })
  phone: string;

  @Type(() => Date)
  @IsDate({ message: 'Ngày sinh không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  dateOfBirth: Date;

  @IsEnum(Gender, { message: 'Giới tính phải là male, female hoặc other' })
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: Gender;
}
