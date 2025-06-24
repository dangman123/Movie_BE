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
  UserID: number;

  @Column({ length: 50, unique: true })
  Username: string;

  @Column({ length: 255 })
  Password: string;

  @Column({ type: 'nvarchar', length: 100 })
  FullName: string;

  @Column({ length: 100, unique: true })
  Email: string;

  @Column({ length: 20, nullable: true })
  Phone: string;

  @Column({ type: 'date', nullable: true })
  DateOfBirth: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Address: string;

  @Column({ length: 20, default: 'Standard' })
  MembershipLevel: string;

  @Column({ default: 0 })
  Points: number;

  @CreateDateColumn()
  RegistrationDate: Date;

  @Column({ type: 'datetime', nullable: true })
  LastLogin: Date;

  @Column({ default: true })
  IsActive: boolean;

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
