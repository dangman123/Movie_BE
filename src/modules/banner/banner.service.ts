import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { BannerResponseDto, BannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  /**
   * Lấy tất cả banner đang active
   */
  async getActiveBanners(): Promise<BannerResponseDto[]> {
    const today = new Date();
    
    const banners = await this.bannerRepository.find();
      
    return this.formatBannerResponse(banners);
  }

  /**
   * Lấy banner theo loại
   */
  async getBannersByType(type: string): Promise<BannerResponseDto[]> {
    const today = new Date();
    
    const banners = await this.bannerRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.movie', 'movie')
      .leftJoinAndSelect('banner.promotion', 'promotion')
      .where('banner.IsActive = :isActive', { isActive: true })
      .andWhere('banner.BannerType = :type', { type })
      .andWhere('banner.StartDate <= :today', { today })
      .andWhere('banner.EndDate >= :today', { today })
      .orderBy('banner.DisplayOrder', 'ASC')
      .getMany();

    return this.formatBannerResponse(banners);
  }

  /**
   * Lấy banner phim đang chiếu
   */
  async getMovieBanners(): Promise<BannerResponseDto[]> {
    const today = new Date();
    
    const banners = await this.bannerRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.movie', 'movie')
      .where('banner.IsActive = :isActive', { isActive: true })
      .andWhere('banner.BannerType = :type', { type: 'movie' })
      .andWhere('banner.StartDate <= :today', { today })
      .andWhere('banner.EndDate >= :today', { today })
      .andWhere('movie.Status = :status', { status: 'NowShowing' })
      .orderBy('banner.DisplayOrder', 'ASC')
      .getMany();

    return this.formatBannerResponse(banners);
  }

  /**
   * Lấy banner khuyến mãi
   */
  async getPromotionBanners(): Promise<BannerResponseDto[]> {
    const today = new Date();
    
    const banners = await this.bannerRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.promotion', 'promotion')
      .where('banner.IsActive = :isActive', { isActive: true })
      .andWhere('banner.BannerType = :type', { type: 'promotion' })
      .andWhere('banner.StartDate <= :today', { today })
      .andWhere('banner.EndDate >= :today', { today })
      .andWhere('promotion.IsActive = :promoActive', { promoActive: true })
      .orderBy('banner.DisplayOrder', 'ASC')
      .getMany();

    return this.formatBannerResponse(banners);
  }

  /**
   * Lấy banner cho mobile (có thể có ảnh khác)
   */
  async getMobileBanners(): Promise<BannerResponseDto[]> {
    const today = new Date();
    
    const banners = await this.bannerRepository
      .createQueryBuilder('banner')
      .leftJoinAndSelect('banner.movie', 'movie')
      .leftJoinAndSelect('banner.promotion', 'promotion')
      .where('banner.IsActive = :isActive', { isActive: true })
      .andWhere('banner.StartDate <= :today', { today })
      .andWhere('banner.EndDate >= :today', { today })
      .andWhere('banner.MobileImageURL IS NOT NULL') // Chỉ lấy banner có ảnh mobile
      .orderBy('banner.DisplayOrder', 'ASC')
      .getMany();

    return this.formatBannerResponse(banners);
  }

  /**
   * Format response cho banner
   */
  private formatBannerResponse(banners: Banner[]): BannerResponseDto[] {
    return banners.map(banner => ({
      BannerID: banner.BannerID,
      Title: banner.Title,
      Description: banner.Description,
      ImageURL: banner.ImageURL,
      MobileImageURL: banner.MobileImageURL,
      LinkURL: banner.LinkURL,
      BannerType: banner.BannerType,
      DisplayOrder: banner.DisplayOrder,
      movie: banner.movie ? {
        MovieID: banner.movie.MovieID,
        Title: banner.movie.Title,
        PosterURL: banner.movie.PosterURL,
        TrailerURL: banner.movie.TrailerURL,
      } : undefined,
      promotion: banner.promotion ? {
        PromotionID: banner.promotion.PromotionID,
        PromotionName: banner.promotion.PromotionName,
        PromotionCode: banner.promotion.PromotionCode,
        DiscountType: banner.promotion.DiscountType,
        DiscountValue: banner.promotion.DiscountValue,
      } : undefined,
    }));
  }

  /**
   * Tạo banner mới
   */
  async createBanner(bannerData: BannerDto): Promise<Banner> {
    const banner = this.bannerRepository.create(bannerData);
    const savedBanner = await this.bannerRepository.save(banner);
    return savedBanner;
  }

  /**
   * Cập nhật banner
   */
  async updateBanner(id: number, bannerData: Partial<BannerDto>): Promise<Banner> {
    await this.bannerRepository.update(id, bannerData);
    const updatedBanner = await this.bannerRepository.findOne({ where: { BannerID: id } });
    
    if (!updatedBanner) {
      throw new Error(`Banner with ID ${id} not found after update`);
    }
    
    return updatedBanner;
  }

  /**
   * Xóa banner
   */
  async deleteBanner(id: number): Promise<void> {
    await this.bannerRepository.delete(id);
  }
}
