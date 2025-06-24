import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from '../showtimes/entities/showtime.entity';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Showtime])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
