import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.directorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorsService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorsService.remove(+id);
  }
}
