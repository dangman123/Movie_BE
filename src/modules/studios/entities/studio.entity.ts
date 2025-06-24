import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

@Entity('Studios')
export class Studio {
  @PrimaryGeneratedColumn()
  StudioID: number;

  @Column({ type: 'nvarchar', length: 100 })
  StudioName: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Country: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Description: string;

  @OneToMany(() => Movie, (movie) => movie.studio)
  movies: Movie[];
}
