import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cinema } from '../../cinemas/entities/cinema.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Showtime } from '../../showtimes/entities/showtime.entity';

@Entity('Rooms')
export class Room {
  @PrimaryGeneratedColumn()
  RoomID: number;

  @Column({ type: 'nvarchar', length: 50 })
  RoomName: string;

  @Column()
  CinemaID: number;

  @Column()
  Capacity: number;

  @Column({ type: 'nvarchar', length: 50 })
  RoomType: string; // 2D, 3D, IMAX, 4DX, etc.

  @Column({ default: true })
  IsActive: boolean;

  @ManyToOne(() => Cinema, (cinema) => cinema.rooms)
  @JoinColumn({ name: 'CinemaID' })
  cinema: Cinema;

  @OneToMany(() => Seat, (seat) => seat.room)
  seats: Seat[];

  @OneToMany(() => Showtime, (showtime) => showtime.room)
  showtimes: Showtime[];
}
