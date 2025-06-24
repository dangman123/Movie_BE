import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Studio } from '../../studios/entities/studio.entity';
import { MovieGenre } from './movie-genre.entity';
import { MovieActor } from './movie-actor.entity';
import { MovieDirector } from './movie-director.entity';
import { Showtime } from '../../showtimes/entities/showtime.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('Movies')
export class Movie {
  @PrimaryGeneratedColumn()
  MovieID: number;

  @Column({ type: 'nvarchar', length: 255 })
  Title: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  OriginalTitle: string;

  @Column({ type: 'nvarchar', length: 2000 })
  Synopsis: string;

  @Column()
  Duration: number; // in minutes

  @Column({ type: 'date' })
  ReleaseDate: Date;

  @Column({ type: 'date', nullable: true })
  EndDate: Date;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  Rating: number;

  @Column({ length: 255, nullable: true })
  PosterURL: string;

  @Column({ length: 255, nullable: true })
  TrailerURL: string;

  @Column({ length: 10, nullable: true })
  AgeRestriction: string;

  @Column({ nullable: true })
  StudioID: number;

  @Column({ length: 20, default: 'Upcoming' })
  Status: string; // Upcoming, NowShowing, Ended

  @Column({ default: true })
  IsActive: boolean;

  @ManyToOne(() => Studio, (studio) => studio.movies)
  @JoinColumn({ name: 'StudioID' })
  studio: Studio;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.movie)
  movieGenres: MovieGenre[];

  @OneToMany(() => MovieActor, (movieActor) => movieActor.movie)
  movieActors: MovieActor[];

  @OneToMany(() => MovieDirector, (movieDirector) => movieDirector.movie)
  movieDirectors: MovieDirector[];

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[];

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
