import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('Notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  NotificationID: number;

  @Column()
  UserID: number;

  @Column({ type: 'nvarchar', length: 100 })
  Title: string;

  @Column({ type: 'nvarchar', length: 500 })
  Message: string;

  @Column({ length: 50 })
  NotificationType: string; // Order, Promotion, System

  @Column({ default: false })
  IsRead: boolean;

  @CreateDateColumn()
  CreatedDate: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'UserID' })
  user: User;
}
