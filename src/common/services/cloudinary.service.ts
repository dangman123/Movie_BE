import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * Upload một ảnh lên Cloudinary
   * @param file - File ảnh từ multer
   * @param folder - Thư mục lưu trữ trên Cloudinary
   * @returns Promise<string> - URL của ảnh đã upload
   */
  async uploadImage(file: Express.Multer.File, folder: string = 'banners'): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          transformation: [
            { width: 1200, height: 630, crop: 'fill', quality: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed: No result returned'));
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  /**
   * Upload nhiều ảnh lên Cloudinary
   * @param files - Mảng các file ảnh
   * @param folder - Thư mục lưu trữ
   * @returns Promise<string[]> - Mảng URL của các ảnh
   */
  async uploadMultipleImages(files: Express.Multer.File[], folder: string = 'banners'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, folder));
    return Promise.all(uploadPromises);
  }

  /**
   * Xóa ảnh khỏi Cloudinary
   * @param publicId - Public ID của ảnh trên Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Trích xuất Public ID từ URL Cloudinary
   * @param url - URL của ảnh trên Cloudinary
   * @returns string - Public ID
   */
  extractPublicId(url: string): string {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  }
}
