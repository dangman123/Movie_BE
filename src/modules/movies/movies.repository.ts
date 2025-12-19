import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectDataSource() // Inject DataSource cho raw SQL queries nếu cần
    private dataSource: DataSource,
  ) {}

  /**
   * Tìm tất cả phim đang chiếu
   */
  async findMoviesShowing(): Promise<Movie[]> {
    return this.movieRepository.find({
      where: { Status: 'NowShowing' },
    });
  }

  /**
   * Tìm tất cả phim sắp chiếu
   */
  async findMoviesComingSoon(): Promise<Movie[]> {
    return this.movieRepository.find({
      where: { Status: 'Upcoming' },
    });
  }
  async findMoviesImax(): Promise<Movie[]> {
    return this.movieRepository.find({
      where: { Status: 'Imax' },
    });
  }
  /**
   * Tìm phim theo ID
   */
  async findById(movieId: number): Promise<Movie | null> {
    return this.movieRepository.findOne({
      where: { MovieID: movieId },
    });
  }

  /**
   * VÍ DỤ 1: Truy vấn phức tạp với Query Builder
   * Lấy phim đang chiếu với đầy đủ thông tin:
   * - Genres, Actors, Directors, Studio
   * - Rating trung bình từ reviews
   * - Số lượng reviews
   */
  async findMoviesShowingWithDetails(): Promise<any[]> {
    const result = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.studio', 'studio')
      .leftJoinAndSelect('movie.movieGenres', 'movieGenre')
      .leftJoinAndSelect('movieGenre.genre', 'genre')
      .leftJoinAndSelect('movie.movieActors', 'movieActor')
      .leftJoinAndSelect('movieActor.actor', 'actor')
      .leftJoinAndSelect('movie.movieDirectors', 'movieDirector')
      .leftJoinAndSelect('movieDirector.director', 'director')
      .leftJoin('movie.reviews', 'review')
      .addSelect('AVG(review.Rating)', 'averageRating')
      .addSelect('COUNT(DISTINCT review.ReviewID)', 'reviewCount')
      .where('movie.Status = :status', { status: 'NowShowing' })
      .andWhere('movie.IsActive = :isActive', { isActive: true })
      .groupBy('movie.MovieID')
      .addGroupBy('studio.StudioID')
      .orderBy('averageRating', 'DESC')
      .getRawAndEntities();

    // Kết hợp entities với raw data
    return result.entities.map((entity, index) => ({
      ...entity,
      averageRating: parseFloat(result.raw[index]?.averageRating || '0'),
      reviewCount: parseInt(result.raw[index]?.reviewCount || '0'),
    }));
  }

  /**
   * VÍ DỤ 2: Truy vấn với aggregation và subquery
   * Lấy top phim phổ biến nhất dựa trên số lượng vé bán
   */
  async findTopPopularMovies(limit: number = 10): Promise<any[]> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoin('movie.showtimes', 'showtime')
      .leftJoin('showtime.tickets', 'ticket')
      .select('movie.MovieID', 'movieId')
      .addSelect('movie.Title', 'title')
      .addSelect('movie.PosterURL', 'posterUrl')
      .addSelect('COUNT(DISTINCT ticket.TicketID)', 'ticketCount')
      .addSelect('SUM(ticket.TicketPrice)', 'totalRevenue')
      .where('movie.Status = :status', { status: 'NowShowing' })
      .andWhere('ticket.IsRefunded = :isRefunded', { isRefunded: false })
      .groupBy('movie.MovieID')
      .orderBy('ticketCount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * VÍ DỤ 3: Truy vấn với điều kiện ngày tháng phức tạp
   * Lấy phim với số lượng suất chiếu sắp tới trong N ngày
   */
  async findMoviesWithUpcomingShowtimes(days: number = 7): Promise<any[]> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoin('movie.showtimes', 'showtime')
      .select('movie.MovieID', 'movieId')
      .addSelect('movie.Title', 'title')
      .addSelect('movie.PosterURL', 'posterUrl')
      .addSelect('COUNT(showtime.ShowtimeID)', 'upcomingShowtimeCount')
      .addSelect('MIN(showtime.ShowDate)', 'nextShowDate')
      .where('movie.Status = :status', { status: 'NowShowing' })
      .andWhere('showtime.ShowDate >= :startDate', { startDate })
      .andWhere('showtime.ShowDate <= :endDate', { endDate })
      .andWhere('showtime.IsActive = :isActive', { isActive: true })
      .andWhere('showtime.Status = :showtimeStatus', {
        showtimeStatus: 'Available',
      })
      .groupBy('movie.MovieID')
      .having('upcomingShowtimeCount > 0')
      .orderBy('nextShowDate', 'ASC')
      .getRawMany();
  }

  /**
   * VÍ DỤ 4: Raw SQL Query cho truy vấn phức tạp
   * Lấy thống kê chi tiết về phim: doanh thu, số vé, rating
   */
  async getMovieStatistics(movieId: number): Promise<any> {
    const query = `
      SELECT 
        m.MovieID,
        m.Title,
        m.Status,
        COUNT(DISTINCT t.TicketID) as totalTicketsSold,
        COUNT(DISTINCT CASE WHEN t.IsRefunded = 0 THEN t.TicketID END) as activeTickets,
        SUM(CASE WHEN t.IsRefunded = 0 THEN t.TicketPrice ELSE 0 END) as totalRevenue,
        AVG(r.Rating) as averageRating,
        COUNT(DISTINCT r.ReviewID) as totalReviews,
        COUNT(DISTINCT st.ShowtimeID) as totalShowtimes,
        COUNT(DISTINCT CASE 
          WHEN st.ShowDate >= CURDATE() 
          AND st.IsActive = 1 
          AND st.Status = 'Available' 
          THEN st.ShowtimeID 
        END) as upcomingShowtimes
      FROM Movies m
      LEFT JOIN Showtimes st ON m.MovieID = st.MovieID
      LEFT JOIN Tickets t ON st.ShowtimeID = t.ShowtimeID
      LEFT JOIN Reviews r ON m.MovieID = r.MovieID AND r.IsApproved = 1
      WHERE m.MovieID = ?
      GROUP BY m.MovieID, m.Title, m.Status
    `;

    const result = await this.dataSource.query(query, [movieId]);
    return result[0] || null;
  }

  /**
   * VÍ DỤ 5: Query Builder với nhiều điều kiện phức tạp
   * Tìm phim theo nhiều tiêu chí: genre, actor, director, rating, khoảng thời gian
   */
  async findMoviesByAdvancedFilters(filters: {
    genreIds?: number[];
    actorIds?: number[];
    directorIds?: number[];
    minRating?: number;
    minReleaseDate?: Date;
    maxReleaseDate?: Date;
    status?: string;
  }): Promise<Movie[]> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieGenres', 'movieGenre')
      .leftJoinAndSelect('movieGenre.genre', 'genre')
      .leftJoinAndSelect('movie.movieActors', 'movieActor')
      .leftJoinAndSelect('movieActor.actor', 'actor')
      .leftJoinAndSelect('movie.movieDirectors', 'movieDirector')
      .leftJoinAndSelect('movieDirector.director', 'director')
      .leftJoinAndSelect('movie.studio', 'studio')
      .leftJoin('movie.reviews', 'review')
      .where('movie.IsActive = :isActive', { isActive: true });

    // Filter theo genres
    if (filters.genreIds && filters.genreIds.length > 0) {
      queryBuilder.andWhere('genre.GenreID IN (:...genreIds)', {
        genreIds: filters.genreIds,
      });
    }

    // Filter theo actors
    if (filters.actorIds && filters.actorIds.length > 0) {
      queryBuilder.andWhere('actor.ActorID IN (:...actorIds)', {
        actorIds: filters.actorIds,
      });
    }

    // Filter theo directors
    if (filters.directorIds && filters.directorIds.length > 0) {
      queryBuilder.andWhere('director.DirectorID IN (:...directorIds)', {
        directorIds: filters.directorIds,
      });
    }

    // Filter theo rating trung bình
    if (filters.minRating) {
      queryBuilder
        .having('AVG(review.Rating) >= :minRating', {
          minRating: filters.minRating,
        })
        .groupBy('movie.MovieID');
    }

    // Filter theo khoảng thời gian release
    if (filters.minReleaseDate) {
      queryBuilder.andWhere('movie.ReleaseDate >= :minReleaseDate', {
        minReleaseDate: filters.minReleaseDate,
      });
    }

    if (filters.maxReleaseDate) {
      queryBuilder.andWhere('movie.ReleaseDate <= :maxReleaseDate', {
        maxReleaseDate: filters.maxReleaseDate,
      });
    }

    // Filter theo status
    if (filters.status) {
      queryBuilder.andWhere('movie.Status = :status', {
        status: filters.status,
      });
    }

    return queryBuilder.getMany();
  }
}
