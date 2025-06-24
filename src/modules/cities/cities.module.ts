import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from '../cinemas/entities/cinema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Cinema])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
