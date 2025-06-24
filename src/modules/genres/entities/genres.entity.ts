import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieGenre } from '../../movies/entities/movie-genre.entity';

@Entity('Genres')
export class Genre {
  @PrimaryGeneratedColumn()
  GenreID: number;

  @Column({ type: 'nvarchar', length: 50 })
  GenreName: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Description: string;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre)
  movieGenres: MovieGenre[];
}
