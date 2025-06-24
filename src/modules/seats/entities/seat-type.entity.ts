import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seat } from './seat.entity';

@Entity('SeatTypes')
export class SeatType {
  @PrimaryGeneratedColumn()
  SeatTypeID: number;

  @Column({ type: 'nvarchar', length: 50 })
  TypeName: string; // Standard, VIP, Couple, etc.

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 1.0 })
  PriceMultiplier: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Description: string;

  @OneToMany(() => Seat, (seat) => seat.seatType)
  seats: Seat[];
}
