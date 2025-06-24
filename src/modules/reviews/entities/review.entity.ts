import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity('Reviews')
@Index(['MovieID', 'UserID'], { unique: true })
export class Review {
  @PrimaryGeneratedColumn()
  ReviewID: number;

  @Column()
  MovieID: number;

  @Column()
  UserID: number;

  @Column()
  Rating: number; // 1-10

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Comment: string;

  @CreateDateColumn()
  ReviewDate: Date;

  @Column({ default: false })
  IsApproved: boolean;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  @JoinColumn({ name: 'MovieID' })
  movie: Movie;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'UserID' })
  user: User;
}
