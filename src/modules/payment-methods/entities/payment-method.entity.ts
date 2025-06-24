import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('PaymentMethods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  PaymentMethodID: number;

  @Column({ type: 'nvarchar', length: 50 })
  MethodName: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Description: string;

  @Column({ default: true })
  IsActive: boolean;

  @OneToMany(() => Order, (order) => order.paymentMethod)
  orders: Order[];
}
