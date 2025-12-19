import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { BannerResponseDto, BannerDto } from './dto/banner.dto';
import { CloudinaryService } from '../../common/services/cloudinary.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    private cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Lấy tất cả banner đang active
   */
  
  async getActiveBanners(): Promise<BannerResponseDto[]> {
    const banners = await this.bannerRepository.find({where: {IsActive: true}});
    return banners;
  }

  /**
   * Upload ảnh banner lên Cloudinary
   * @param file - File ảnh từ multer
   * @returns Promise<string> - URL của ảnh đã upload
   */
  async uploadBannerImage(file: Express.Multer.File): Promise<string> {
    return this.cloudinaryService.uploadImage(file, 'banners');
  }

  /**
   * Upload nhiều ảnh banner
   * @param files - Mảng các file ảnh
   * @returns Promise<string[]> - Mảng URL của các ảnh
   */
  async uploadMultipleBannerImages(files: Express.Multer.File[]): Promise<string[]> {
    return this.cloudinaryService.uploadMultipleImages(files, 'banners');
  }

  /**
   * Xóa ảnh banner khỏi Cloudinary
   * @param imageUrl - URL của ảnh cần xóa
   */
  async deleteBannerImage(imageUrl: string): Promise<void> {
    const publicId = this.cloudinaryService.extractPublicId(imageUrl);
    return this.cloudinaryService.deleteImage(publicId);
  }
}
