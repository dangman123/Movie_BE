import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Concession } from './concession.entity';

@Entity('OrderConcessions')
export class OrderConcession {
  @PrimaryGeneratedColumn()
  OrderConcessionID: number;

  @Column()
  OrderID: number;

  @Column()
  ConcessionID: number;

  @Column()
  Quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  UnitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderConcessions)
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => Concession, (concession) => concession.orderConcessions)
  @JoinColumn({ name: 'ConcessionID' })
  concession: Concession;
}
