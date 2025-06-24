import { Injectable } from '@nestjs/common';
import { CreateSystemSettingDto } from './dto/create-system-setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system-setting.dto';

@Injectable()
export class SystemSettingsService {
  create(createSystemSettingDto: CreateSystemSettingDto) {
    return 'This action adds a new systemSetting';
  }

  findAll() {
    return `This action returns all systemSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemSetting`;
  }

  update(id: number, updateSystemSettingDto: UpdateSystemSettingDto) {
    return `This action updates a #${id} systemSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemSetting`;
  }
}
