import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieActor } from '../../movies/entities/movie-actor.entity';

@Entity('Actors')
export class Actor {
  @PrimaryGeneratedColumn()
  ActorID: number;

  @Column({ type: 'nvarchar', length: 100 })
  ActorName: string;

  @Column({ type: 'date', nullable: true })
  DateOfBirth: Date;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Nationality: string;

  @Column({ type: 'nvarchar', length: 1000, nullable: true })
  Biography: string;

  @Column({ length: 255, nullable: true })
  ImageURL: string;

  @OneToMany(() => MovieActor, (movieActor) => movieActor.actor)
  movieActors: MovieActor[];
}
