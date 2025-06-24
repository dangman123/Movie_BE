import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from '../../genres/entities/genres.entity';

@Entity('Movie_Genres')
export class MovieGenre {
  @PrimaryColumn()
  MovieID: number;

  @PrimaryColumn()
  GenreID: number;

  @ManyToOne(() => Movie, (movie) => movie.movieGenres)
  @JoinColumn({ name: 'MovieID' })
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.movieGenres)
  @JoinColumn({ name: 'GenreID' })
  genre: Genre;
}
