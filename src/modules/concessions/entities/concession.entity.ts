import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderConcession } from './order-concession.entity';

@Entity('Concessions')
export class Concession {
  @PrimaryGeneratedColumn()
  ConcessionID: number;

  @Column({ type: 'nvarchar', length: 100 })
  Name: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @Column({ length: 50 })
  Category: string; // Food, Drink, Combo

  @Column({ length: 255, nullable: true })
  ImageURL: string;

  @Column({ default: true })
  IsAvailable: boolean;

  @OneToMany(
    () => OrderConcession,
    (orderConcession) => orderConcession.concession,
  )
  orderConcessions: OrderConcession[];
}
