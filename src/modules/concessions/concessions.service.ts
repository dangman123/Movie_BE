import { Injectable } from '@nestjs/common';
import { CreateConcessionDto } from './dto/create-concession.dto';
import { UpdateConcessionDto } from './dto/update-concession.dto';

@Injectable()
export class ConcessionsService {
  create(createConcessionDto: CreateConcessionDto) {
    return 'This action adds a new concession';
  }

  findAll() {
    return `This action returns all concessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concession`;
  }

  update(id: number, updateConcessionDto: UpdateConcessionDto) {
    return `This action updates a #${id} concession`;
  }

  remove(id: number) {
    return `This action removes a #${id} concession`;
  }
}
