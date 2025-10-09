import { IsOptional, IsNumber, IsString, IsDate, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export enum BannerType {
  MOVIE = 'movie',
  PROMOTION = 'promotion',
  EVENT = 'event',
}

export class BannerDto {
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsString()
  ImageURL: string;

  @IsOptional()
  @IsString()
  MobileImageURL?: string;

  @IsOptional()
  @IsString()
  LinkURL?: string;

  @IsEnum(BannerType)
  BannerType: BannerType;

  @IsOptional()
  @IsNumber()
  MovieID?: number;

  @IsOptional()
  @IsNumber()
  PromotionID?: number;

  @IsOptional()
  @IsNumber()
  DisplayOrder?: number;

  @Type(() => Date)
  @IsDate()
  StartDate: Date;

  @Type(() => Date)
  @IsDate()
  EndDate: Date;

  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;
}

export class BannerResponseDto {
  BannerID: number;
  Title: string;
  Description?: string;
  ImageURL: string;
  MobileImageURL?: string;
  LinkURL?: string;
  BannerType: string;
  DisplayOrder: number;
  movie?: {
    MovieID: number;
    Title: string;
    PosterURL?: string;
    TrailerURL?: string;
  };
  promotion?: {
    PromotionID: number;
    PromotionName: string;
    PromotionCode?: string;
    DiscountType: string;
    DiscountValue: number;
  };
}
