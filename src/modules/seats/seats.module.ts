import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatType } from './entities/seat-type.entity';
import { Seat } from './entities/seat.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Ticket, SeatType])],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
