import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ActorsModule } from './modules/actors/actors.module';
import { User } from './modules/users/entities/user.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { Order } from './modules/orders/entities/order.entity';
import { Actor } from './modules/actors/entities/actor.entity';
import { City } from './modules/cities/entities/city.entity';
import { Cinema } from './modules/cinemas/entities/cinema.entity';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { Room } from './modules/rooms/entities/room.entity';
import { RoomsModule } from './modules/rooms/rooms.module';
import { SeatsModule } from './modules/seats/seats.module';
import { Seat } from './modules/seats/entities/seat.entity';
import { SeatType } from './modules/seats/entities/seat-type.entity';
import { Ticket } from './modules/tickets/entities/ticket.entity';
import { TicketsModule } from './modules/tickets/tickets.module';
import { Showtime } from './modules/showtimes/entities/showtime.entity';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';
import { Movie } from './modules/movies/entities/movie.entity';
import { MoviesModule } from './modules/movies/movies.module';
import { Studio } from './modules/studios/entities/studio.entity';
import { Concession } from './modules/concessions/entities/concession.entity';
import { Director } from './modules/directors/entities/director.entity';
import { Notification } from './modules/notifications/entities/notification.entity';
import { PaymentMethod } from './modules/payment-methods/entities/payment-method.entity';
import { PointHistory } from './modules/point-history/entities/point-history.entity';
import { Promotion } from './modules/promotions/entities/promotion.entity';
import { Review } from './modules/reviews/entities/review.entity';
import { SystemLog } from './modules/system-logs/entities/system-log.entity';
import { SystemSetting } from './modules/system-settings/entities/system-setting.entity';
import { Genre } from './modules/genres/entities/genres.entity';
import { CitiesModule } from './modules/cities/cities.module';
import { ConcessionsModule } from './modules/concessions/concessions.module';
import { DirectorsModule } from './modules/directors/directors.module';
import { GenresModule } from './modules/genres/genres.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { PointHistoryModule } from './modules/point-history/point-history.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { StudiosModule } from './modules/studios/studios.module';
import { SystemLogsModule } from './modules/system-logs/system-logs.module';
import { SystemSettingsModule } from './modules/system-settings/system-settings.module';
import { OrderConcession } from './modules/concessions/entities/order-concession.entity';
import { MovieActor } from './modules/movies/entities/movie-actor.entity';
import { MovieDirector } from './modules/movies/entities/movie-director.entity';
import { MovieGenre } from './modules/movies/entities/movie-genre.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'movie',
      entities: [
        Actor,
        Cinema,
        City,
        Concession,
        OrderConcession,
        Director,
        Genre,
        Movie,
        MovieActor,
        MovieDirector,
        MovieGenre,
        Notification,
        Order,
        PaymentMethod,
        PointHistory,
        Promotion,
        Review,
        Room,
        Seat,
        SeatType,
        Showtime,
        Studio,
        SystemLog,
        SystemSetting,
        Ticket,
        User,
      ],
      synchronize: false,
    }),
    AuthModule,
    OrdersModule,
    ActorsModule,
    CinemasModule,
    CitiesModule,
    ConcessionsModule,
    DirectorsModule,
    GenresModule,
    MoviesModule,
    NotificationsModule,
    OrdersModule,
    PaymentMethodsModule,
    PointHistoryModule,
    PromotionsModule,
    ReviewsModule,
    RoomsModule,
    SeatsModule,
    ShowtimesModule,
    StudiosModule,
    SystemLogsModule,
    SystemSettingsModule,
    TicketsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
