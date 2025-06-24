import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Director } from '../../directors/entities/director.entity';

@Entity('Movie_Directors')
export class MovieDirector {
  @PrimaryColumn()
  MovieID: number;

  @PrimaryColumn()
  DirectorID: number;

  @ManyToOne(() => Movie, (movie) => movie.movieDirectors)
  @JoinColumn({ name: 'MovieID' })
  movie: Movie;

  @ManyToOne(() => Director, (director) => director.movieDirectors)
  @JoinColumn({ name: 'DirectorID' })
  director: Director;
}
