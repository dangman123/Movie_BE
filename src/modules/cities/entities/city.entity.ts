import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cinema } from '../../cinemas/entities/cinema.entity';

@Entity('Cities')
export class City {
  @PrimaryGeneratedColumn()
  CityID: number;

  @Column({ type: 'nvarchar', length: 100 })
  CityName: string;

  @Column({ default: true })
  IsActive: boolean;

  @OneToMany(() => Cinema, (cinema) => cinema.city)
  cinemas: Cinema[];
}
