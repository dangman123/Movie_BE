import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Showtime } from './entities/showtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime, Ticket, Movie, Room])],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
})
export class ShowtimesModule {}
