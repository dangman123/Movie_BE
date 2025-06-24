import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('PointHistory')
export class PointHistory {
  @PrimaryGeneratedColumn()
  PointHistoryID: number;

  @Column()
  UserID: number;

  @Column()
  Points: number; // Positive for earned, negative for used

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Description: string;

  @CreateDateColumn()
  TransactionDate: Date;

  @Column({ nullable: true })
  OrderID: number;

  @ManyToOne(() => User, (user) => user.pointHistories)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => Order, (order) => order.pointHistories)
  @JoinColumn({ name: 'OrderID' })
  order: Order;
}
