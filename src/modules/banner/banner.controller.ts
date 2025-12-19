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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';
import { Public } from 'src/common/decorators/customize';
import { successListResponse, errorResponse } from 'src/common/helpers/api-response.helper';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Public()
  @Get()
  async getAllBanners() {
    try {
      const banners = await this.bannerService.getActiveBanners();
      return successListResponse(banners, 'Banners fetched successfully');
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to fetch banners', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Upload một ảnh banner
   * POST /banners/upload
   * Body: FormData với field 'image'
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadBannerImage(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException(
          errorResponse('No image file provided', 'UPLOAD_ERROR'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const imageUrl = await this.bannerService.uploadBannerImage(file);
      return {
        success: true,
        message: 'Image uploaded successfully',
        data: { imageUrl },
      };
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to upload image', 'UPLOAD_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Upload nhiều ảnh banner
   * POST /banners/upload-multiple
   * Body: FormData với field 'images' (array)
   */
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('images', 10)) // Tối đa 10 ảnh
  async uploadMultipleBannerImages(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      if (!files || files.length === 0) {
        throw new HttpException(
          errorResponse('No image files provided', 'UPLOAD_ERROR'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const imageUrls = await this.bannerService.uploadMultipleBannerImages(files);
      return {
        success: true,
        message: 'Images uploaded successfully',
        data: { imageUrls },
      };
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to upload images', 'UPLOAD_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
