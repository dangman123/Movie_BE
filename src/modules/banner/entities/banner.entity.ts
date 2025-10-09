import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';

@Entity('Banners')
export class Banner {
  @PrimaryGeneratedColumn()
  BannerID: number;

  @Column({ type: 'nvarchar', length: 255 })
  Title: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Description: string;

  @Column({ length: 255 })
  ImageURL: string;

  @Column({ length: 255, nullable: true })
  MobileImageURL: string; // Ảnh riêng cho mobile

  @Column({ length: 255, nullable: true })
  LinkURL: string; // Link khi click vào banner

  @Column({ length: 50 })
  BannerType: string; // 'movie', 'promotion', 'event'

  @Column({ nullable: true })
  MovieID: number; // Nếu là banner phim

  @Column({ nullable: true })
  PromotionID: number; // Nếu là banner khuyến mãi

  @Column({ type: 'int', default: 1 })
  DisplayOrder: number; // Thứ tự hiển thị

  @Column({ type: 'datetime' })
  StartDate: Date;

  @Column({ type: 'datetime' })
  EndDate: Date;

  @Column({ default: true })
  IsActive: boolean;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  // Relations
  @ManyToOne(() => Movie, { nullable: true })
  @JoinColumn({ name: 'MovieID' })
  movie: Movie;

  @ManyToOne(() => Promotion, { nullable: true })
  @JoinColumn({ name: 'PromotionID' })
  promotion: Promotion;
}
