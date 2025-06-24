import { Injectable } from '@nestjs/common';
import { CreatePointHistoryDto } from './dto/create-point-history.dto';
import { UpdatePointHistoryDto } from './dto/update-point-history.dto';

@Injectable()
export class PointHistoryService {
  create(createPointHistoryDto: CreatePointHistoryDto) {
    return 'This action adds a new pointHistory';
  }

  findAll() {
    return `This action returns all pointHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pointHistory`;
  }

  update(id: number, updatePointHistoryDto: UpdatePointHistoryDto) {
    return `This action updates a #${id} pointHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} pointHistory`;
  }
}
