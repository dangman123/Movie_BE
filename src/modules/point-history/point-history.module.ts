import { Module } from '@nestjs/common';
import { PointHistoryService } from './point-history.service';
import { PointHistoryController } from './point-history.controller';

@Module({
  controllers: [PointHistoryController],
  providers: [PointHistoryService],
})
export class PointHistoryModule {}
