import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './movies.repository';
import { Movie } from './entities/movie.entity';
import { generateSlug } from '../../common/helpers/slug.helper';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  private getDateAtMidnight(dateInput: Date | string | null): Date {
    if (!dateInput) {
      // Nếu không có input, trả về ngày hôm nay
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }

    const d =
      typeof dateInput === 'string'
        ? new Date(dateInput + 'T00:00:00')
        : new Date(dateInput);

    d.setHours(0, 0, 0, 0);
    return d;
  }

  async findMoviesShowing(): Promise<Movie[]> {
    try {
      const movies = await this.moviesRepository.findMoviesShowing();
      const today = this.getDateAtMidnight(new Date()); // Luôn trả về Date, không null

      const validMovies = movies.filter((movie) => {
        const releaseDate = this.getDateAtMidnight(movie.ReleaseDate);

        return movie.IsActive && releaseDate !== null && releaseDate <= today;
      });

      return validMovies;
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy danh sách phim đang chiếu',
      );
    }
  }
  async findMoviesImax(): Promise<Movie[]> {
    try {
      const movies = await this.moviesRepository.findMoviesImax();
      const validMovies = movies.filter((movie) => movie.IsActive);
      return validMovies;
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy danh sách phim IMAX',
      );
    }
  }
  async findMoviesComingSoon(): Promise<Movie[]> {
    try {
      const movies = await this.moviesRepository.findMoviesComingSoon();
      const today = this.getDateAtMidnight(new Date()); // Luôn trả về Date, không null

      const upcomingMovies = movies
        .filter((movie) => {
          const releaseDate = this.getDateAtMidnight(movie.ReleaseDate);

          return movie.IsActive && releaseDate !== null && releaseDate > today;
        })
        .sort((a, b) => {
          const dateA = this.getDateAtMidnight(a.ReleaseDate)?.getTime() || 0;
          const dateB = this.getDateAtMidnight(b.ReleaseDate)?.getTime() || 0;
          return dateA - dateB;
        });

      return upcomingMovies;
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy danh sách phim sắp chiếu',
      );
    }
  }
  async findMoviesBySlug(slug: string) { 
    try {
      const movie = await this.moviesRepository.findMoviesBySlug(slug);
      return movie;
    } catch (error) {
      throw new InternalServerErrorException(
        'Không thể lấy thông tin phim',
      );
    }
  }
}
