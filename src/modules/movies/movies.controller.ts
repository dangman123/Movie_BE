import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Public } from 'src/common/decorators/customize';
import {
  errorResponse,
  successListResponse,
  successResponse,
} from 'src/common/helpers/api-response.helper';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Public()
  @Get('showing')
  async findMoviesShowing() {
    try {
      const movies = await this.moviesService.findMoviesShowing();
      return successListResponse(movies);
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to fetch Movies', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Public()
  @Get('comming')
  async findMoviesComingSoon() {
    try {
      const movies = await this.moviesService.findMoviesComingSoon();
      return successListResponse(
        movies
      );
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to fetch Movies', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Public()
  @Get('movie-imax')
  async findMoviesIMAX() {
    try {
      const movies = await this.moviesService.findMoviesImax(); 
      return successListResponse(
        movies
      );
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to fetch Movies', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Public()
  @Get(':slug')
  async findMoviesBySlug(@Param('slug') slug: string) {
    try {
      const movie = await this.moviesService.findMoviesBySlug(slug);
      return successResponse(movie);
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to fetch Movie', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
