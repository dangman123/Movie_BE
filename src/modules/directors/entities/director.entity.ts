import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieDirector } from '../../movies/entities/movie-director.entity';

@Entity('Directors')
export class Director {
  @PrimaryGeneratedColumn()
  DirectorID: number;

  @Column({ type: 'nvarchar', length: 100 })
  DirectorName: string;

  @Column({ type: 'date', nullable: true })
  DateOfBirth: Date;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Nationality: string;

  @Column({ type: 'nvarchar', length: 1000, nullable: true })
  Biography: string;

  @Column({ length: 255, nullable: true })
  ImageURL: string;

  @OneToMany(() => MovieDirector, (movieDirector) => movieDirector.director)
  movieDirectors: MovieDirector[];
}
