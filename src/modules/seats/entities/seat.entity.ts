import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { SeatType } from './seat-type.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('Seats')
@Index(['RoomID', 'SeatRow', 'SeatNumber'], { unique: true })
export class Seat {
  @PrimaryGeneratedColumn()
  SeatID: number;

  @Column()
  RoomID: number;

  @Column({ length: 5 })
  SeatRow: string;

  @Column({ length: 5 })
  SeatNumber: string;

  @Column()
  SeatTypeID: number;

  @Column({ length: 20, default: 'Active' })
  Status: string; // Active, Maintenance, Deactivated

  @ManyToOne(() => Room, (room) => room.seats)
  @JoinColumn({ name: 'RoomID' })
  room: Room;

  @ManyToOne(() => SeatType, (seatType) => seatType.seats)
  @JoinColumn({ name: 'SeatTypeID' })
  seatType: SeatType;

  @OneToMany(() => Ticket, (ticket) => ticket.seat)
  tickets: Ticket[];
}
