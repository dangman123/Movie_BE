import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../rooms/entities/room.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('Showtimes')
@Index(['RoomID', 'ShowDate', 'StartTime'], { unique: true })
export class Showtime {
  @PrimaryGeneratedColumn()
  ShowtimeID: number;

  @Column()
  MovieID: number;

  @Column()
  RoomID: number;

  @Column({ type: 'date' })
  ShowDate: Date;

  @Column({ type: 'time' })
  StartTime: string;

  @Column({ type: 'time' })
  EndTime: string;

  @Column({ length: 50, nullable: true })
  LanguageVersion: string; // Subbed, Dubbed

  @Column({ length: 50, nullable: true })
  ScreenFormat: string; // 2D, 3D, IMAX, etc.

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  BasePrice: number;

  @Column({ length: 20, default: 'Available' })
  Status: string; // Available, SoldOut, Cancelled

  @Column({ default: true })
  IsActive: boolean;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  @JoinColumn({ name: 'MovieID' })
  movie: Movie;

  @ManyToOne(() => Room, (room) => room.showtimes)
  @JoinColumn({ name: 'RoomID' })
  room: Room;

  @OneToMany(() => Ticket, (ticket) => ticket.showtime)
  tickets: Ticket[];
}
