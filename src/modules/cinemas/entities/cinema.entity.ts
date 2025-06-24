import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity('Cinemas')
export class Cinema {
  @PrimaryGeneratedColumn()
  CinemaID: number;

  @Column({ type: 'nvarchar', length: 100 })
  CinemaName: string;

  @Column({ type: 'nvarchar', length: 255 })
  Address: string;

  @Column()
  CityID: number;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Description: string;

  @Column({ type: 'time', nullable: true })
  OpenTime: string;

  @Column({ type: 'time', nullable: true })
  CloseTime: string;

  @Column({ length: 20, nullable: true })
  Phone: string;

  @Column({ length: 100, nullable: true })
  Email: string;

  @Column({ length: 255, nullable: true })
  ImageURL: string;

  @Column({ default: true })
  IsActive: boolean;

  @ManyToOne(() => City, (city) => city.cinemas)
  @JoinColumn({ name: 'CityID' })
  city: City;

  @OneToMany(() => Room, (room) => room.cinema)
  rooms: Room[];
}
