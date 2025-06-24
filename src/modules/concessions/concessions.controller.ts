import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcessionsService } from './concessions.service';
import { CreateConcessionDto } from './dto/create-concession.dto';
import { UpdateConcessionDto } from './dto/update-concession.dto';

@Controller('concessions')
export class ConcessionsController {
  constructor(private readonly concessionsService: ConcessionsService) {}

  @Post()
  create(@Body() createConcessionDto: CreateConcessionDto) {
    return this.concessionsService.create(createConcessionDto);
  }

  @Get()
  findAll() {
    return this.concessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcessionDto: UpdateConcessionDto) {
    return this.concessionsService.update(+id, updateConcessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concessionsService.remove(+id);
  }
}
