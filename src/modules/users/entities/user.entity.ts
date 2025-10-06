import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { PointHistory } from '../../point-history/entities/point-history.entity';
import { SystemLog } from '../../system-logs/entities/system-log.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'nvarchar', length: 100 })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  address: string;

  @Column({ length: 20, default: 'Standard' })
  membershipLevel: string;

  @Column({ default: 0 })
  points: number;

  @CreateDateColumn()
  registrationDate: Date;

  @Column({ type: 'datetime', nullable: true })
  lastLogin: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => PointHistory, (pointHistory) => pointHistory.user)
  pointHistories: PointHistory[];

  @OneToMany(() => SystemLog, (systemLog) => systemLog.user)
  systemLogs: SystemLog[];
}
