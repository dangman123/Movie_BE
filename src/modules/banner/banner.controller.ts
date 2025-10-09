import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';
import { Public } from 'src/common/decorators/customize';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Public()
  @Get()
  async getAllBanners() {
    try {
      const banners = await this.bannerService.getActiveBanners();
      return {
        success: true,
        data: banners,
        meta: {
          total: banners.length,
          lastUpdated: new Date(),
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch banners',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Lấy banner theo loại
   * GET /banner/banners/movie
   * GET /banner/banners/promotion
   */
  @Public()
  @Get('banners/:type')
  async getBannersByType(@Param('type') type: string) {
    const validTypes = ['movie', 'promotion', 'event'];
    
    if (!validTypes.includes(type)) {
      throw new HttpException(
        `Invalid banner type. Valid types: ${validTypes.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const banners = await this.bannerService.getBannersByType(type);
      return {
        success: true,
        data: banners,
        meta: {
          type,
          total: banners.length,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch banners by type',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Lấy banner phim đang chiếu
   * GET /banner/movies
   */
  @Public()
  @Get('movies')
  async getMovieBanners() {
    try {
      const banners = await this.bannerService.getMovieBanners();
      return {
        success: true,
        data: banners,
        meta: {
          type: 'movie',
          total: banners.length,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movie banners',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Lấy banner khuyến mãi
   * GET /banner/promotions
   */
  @Public()
  @Get('promotions')
  async getPromotionBanners() {
    try {
      const banners = await this.bannerService.getPromotionBanners();
      return {
        success: true,
        data: banners,
        meta: {
          type: 'promotion',
          total: banners.length,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch promotion banners',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Lấy banner cho mobile
   * GET /banner/mobile
   */
  @Public()
  @Get('mobile')
  async getMobileBanners() {
    try {
      const banners = await this.bannerService.getMobileBanners();
      return {
        success: true,
        data: banners,
        meta: {
          platform: 'mobile',
          total: banners.length,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch mobile banners',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ========== ADMIN ENDPOINTS ==========

  /**
   * Tạo banner mới (Admin only)
   */
  // @Post('banners')
  // async createBanner(@Body() bannerData: BannerDto) {
  //   try {
  //     const banner = await this.bannerService.createBanner(bannerData);
  //     return {
  //       success: true,
  //       data: banner,
  //       message: 'Banner created successfully',
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       'Failed to create banner',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  /**
   * Cập nhật banner (Admin only)
   */
  @Patch('banners/:id')
  async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() bannerData: Partial<BannerDto>,
  ) {
    try {
      const banner = await this.bannerService.updateBanner(id, bannerData);
      return {
        success: true,
        data: banner,
        message: 'Banner updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update banner',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Xóa banner (Admin only)
   */
  @Delete('banners/:id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.bannerService.deleteBanner(id);
      return {
        success: true,
        message: 'Banner deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to delete banner',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
