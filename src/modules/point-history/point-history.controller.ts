import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointHistoryService } from './point-history.service';
import { CreatePointHistoryDto } from './dto/create-point-history.dto';
import { UpdatePointHistoryDto } from './dto/update-point-history.dto';

@Controller('point-history')
export class PointHistoryController {
  constructor(private readonly pointHistoryService: PointHistoryService) {}

  @Post()
  create(@Body() createPointHistoryDto: CreatePointHistoryDto) {
    return this.pointHistoryService.create(createPointHistoryDto);
  }

  @Get()
  findAll() {
    return this.pointHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointHistoryDto: UpdatePointHistoryDto) {
    return this.pointHistoryService.update(+id, updatePointHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointHistoryService.remove(+id);
  }
}
