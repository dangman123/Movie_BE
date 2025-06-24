import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Seat } from '../seats/entities/seat.entity';
import { Showtime } from '../showtimes/entities/showtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Seat, Showtime])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
