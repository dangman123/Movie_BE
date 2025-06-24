import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('Promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  PromotionID: number;

  @Column({ type: 'nvarchar', length: 100 })
  PromotionName: string;

  @Column({ length: 20, nullable: true, unique: true })
  PromotionCode: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Description: string;

  @Column({ length: 20 })
  DiscountType: string; // Percentage, FixedAmount

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  DiscountValue: number;

  @Column({ type: 'datetime' })
  StartDate: Date;

  @Column({ type: 'datetime' })
  EndDate: Date;

  @Column({ nullable: true })
  UsageLimit: number;

  @Column({ default: 0 })
  CurrentUsage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  MinPurchaseAmount: number;

  @Column({ default: true })
  IsActive: boolean;

  @OneToMany(() => Order, (order) => order.promotion)
  orders: Order[];
}
