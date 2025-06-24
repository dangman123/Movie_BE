import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Showtime } from '../../showtimes/entities/showtime.entity';
import { Seat } from '../../seats/entities/seat.entity';

@Entity('Tickets')
@Index(['ShowtimeID', 'SeatID'], { unique: true })
export class Ticket {
  @PrimaryGeneratedColumn()
  TicketID: number;

  @Column()
  OrderID: number;

  @Column()
  ShowtimeID: number;

  @Column()
  SeatID: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TicketPrice: number;

  @Column({ length: 20, unique: true })
  TicketCode: string;

  @Column({ default: false })
  IsUsed: boolean;

  @Column({ default: false })
  IsRefunded: boolean;

  @ManyToOne(() => Order, (order) => order.tickets)
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => Showtime, (showtime) => showtime.tickets)
  @JoinColumn({ name: 'ShowtimeID' })
  showtime: Showtime;

  @ManyToOne(() => Seat, (seat) => seat.tickets)
  @JoinColumn({ name: 'SeatID' })
  seat: Seat;
}
