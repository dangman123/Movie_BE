import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Actor } from '../../actors/entities/actor.entity';

@Entity('Movie_Actors')
export class MovieActor {
  @PrimaryColumn()
  MovieID: number;

  @PrimaryColumn()
  ActorID: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  Role: string;

  @ManyToOne(() => Movie, (movie) => movie.movieActors)
  @JoinColumn({ name: 'MovieID' })
  movie: Movie;

  @ManyToOne(() => Actor, (actor) => actor.movieActors)
  @JoinColumn({ name: 'ActorID' })
  actor: Actor;
}
