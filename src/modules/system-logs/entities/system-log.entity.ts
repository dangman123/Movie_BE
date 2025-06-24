import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('SystemLogs')
export class SystemLog {
  @PrimaryGeneratedColumn()
  LogID: number;

  @Column({ length: 50 })
  LogType: string;

  @Column({ type: 'nvarchar', length: 500 })
  LogMessage: string;

  @CreateDateColumn()
  LogDate: Date;

  @Column({ nullable: true })
  UserID: number;

  @Column({ length: 50, nullable: true })
  IPAddress: string;

  @Column({ length: 255, nullable: true })
  UserAgent: string;

  @ManyToOne(() => User, (user) => user.systemLogs)
  @JoinColumn({ name: 'UserID' })
  user: User;
}
