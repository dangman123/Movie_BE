import { Injectable } from '@nestjs/common';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { UpdateSystemLogDto } from './dto/update-system-log.dto';

@Injectable()
export class SystemLogsService {
  create(createSystemLogDto: CreateSystemLogDto) {
    return 'This action adds a new systemLog';
  }

  findAll() {
    return `This action returns all systemLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemLog`;
  }

  update(id: number, updateSystemLogDto: UpdateSystemLogDto) {
    return `This action updates a #${id} systemLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemLog`;
  }
}
