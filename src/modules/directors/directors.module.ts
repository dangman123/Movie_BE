import { Module } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsController } from './directors.controller';

@Module({
  controllers: [DirectorsController],
  providers: [DirectorsService],
})
export class DirectorsModule {}
