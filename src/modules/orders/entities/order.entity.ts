import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { PaymentMethod } from '../../payment-methods/entities/payment-method.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { OrderConcession } from '../../concessions/entities/order-concession.entity';
import { PointHistory } from '../../point-history/entities/point-history.entity';

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  OrderID: number;

  @Column()
  UserID: number;

  @CreateDateColumn()
  OrderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  DiscountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  FinalAmount: number;

  @Column({ nullable: true })
  PromotionID: number;

  @Column()
  PaymentMethodID: number;

  @Column({ length: 20, default: 'Pending' })
  PaymentStatus: string; // Pending, Completed, Failed, Refunded

  @Column({ length: 20, default: 'Pending' })
  OrderStatus: string; // Pending, Confirmed, Cancelled

  @Column({ length: 50, nullable: true })
  TransactionCode: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => Promotion, (promotion) => promotion.orders)
  @JoinColumn({ name: 'PromotionID' })
  promotion: Promotion;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders)
  @JoinColumn({ name: 'PaymentMethodID' })
  paymentMethod: PaymentMethod;

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets: Ticket[];

  @OneToMany(() => OrderConcession, (orderConcession) => orderConcession.order)
  orderConcessions: OrderConcession[];

  @OneToMany(() => PointHistory, (pointHistory) => pointHistory.order)
  pointHistories: PointHistory[];
}
