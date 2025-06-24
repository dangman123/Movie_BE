import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  create(@Body() createStudioDto: CreateStudioDto) {
    return this.studiosService.create(createStudioDto);
  }

  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studiosService.update(+id, updateStudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studiosService.remove(+id);
  }
}
