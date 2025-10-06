import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('=== CUSTOM PIPE ĐƯỢC GỌI ===');
    console.log('Dữ liệu đầu vào:', JSON.stringify(value, null, 2));
    console.log('Metadata:', metadata);
    console.log('Type of value:', typeof value);

    // Kiểm tra nếu không có dữ liệu
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Dữ liệu không hợp lệ');
    }

    const errors: string[] = [];

    // ✅ Kiểm tra username hoặc Username
    const username = value.username || value.Username;
    console.log('Username found:', username);
    if (!username) {
      errors.push('Username là bắt buộc');
    } else if (username.length < 3) {
      errors.push('Username phải có ít nhất 3 ký tự');
    }

    // ✅ Kiểm tra email hoặc Email (chữ hoa)
    const email = value.email || value.Email;
    console.log('Email found:', email);
    if (!email) {
      errors.push('Email là bắt buộc');
    } else if (!this.isValidEmail(email)) {
      errors.push('Email không đúng định dạng');
    }

    // ✅ Kiểm tra password hoặc Password
    const password = value.password || value.Password;
    console.log('Password found:', password ? '***có***' : 'không có');
    if (!password) {
      errors.push('Password là bắt buộc');
    } else if (password.length < 6) {
      errors.push('Password phải có ít nhất 6 ký tự');
    }

    // Nếu có lỗi, throw exception
    if (errors.length > 0) {
      console.log('=== VALIDATION ERRORS ===');
      console.log(errors);
      throw new BadRequestException({
        message: 'Validation failed by Custom Pipe',
        errors: errors,
      });
    }

    // Transform dữ liệu - chuẩn hóa field names
    const transformedData = {
      username: username,
      email: email.toLowerCase(),
      password: password,
      processedAt: new Date().toISOString(),
      processedBy: 'CustomValidationPipe',
    };

    console.log('=== DỮ LIỆU SAU KHI TRANSFORM ===');
    console.log(JSON.stringify(transformedData, null, 2));

    return transformedData;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
