import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SystemSettings')
export class SystemSetting {
  @PrimaryGeneratedColumn()
  SettingID: number;

  @Column({ length: 50, unique: true })
  SettingKey: string;

  @Column({ type: 'nvarchar', length: 500 })
  SettingValue: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Description: string;

  @UpdateDateColumn()
  UpdatedDate: Date;
}
