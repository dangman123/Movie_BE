# 🚀 Cấu trúc API Response chung

## 📋 Tổng quan

Cấu trúc API response chung giúp tất cả module có format response nhất quán, dễ sử dụng và bảo trì.

## 🏗️ Cấu trúc Response

### Success Response
```json
{
  "success": true,
  "data": [...],
  "message": "Operation successful",
  "meta": {
    "total": 10,
    "lastUpdated": "2024-01-01T00:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error message"
  }
}
```

## 🛠️ Cách sử dụng

### 1. Import helper functions
```typescript
import { 
  successResponse, 
  successListResponse, 
  errorResponse 
} from 'src/common/helpers/api-response.helper';
```

### 2. Sử dụng trong Controller

#### Single Item Response
```typescript
@Get(':id')
async getById(@Param('id') id: number) {
  try {
    const item = await this.service.findOne(id);
    return successResponse(item, 'Item fetched successfully');
  } catch (error) {
    throw new HttpException(
      errorResponse('Failed to fetch item', 'FETCH_ERROR', error.message),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
```

#### List Response (không pagination)
```typescript
@Get()
async getAll() {
  try {
    const items = await this.service.findAll();
    return successListResponse(items, 'Items fetched successfully');
  } catch (error) {
    throw new HttpException(
      errorResponse('Failed to fetch items', 'FETCH_ERROR', error.message),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
```

#### List Response (có pagination)
```typescript
@Get()
async getAll(@Query('page') page: number, @Query('limit') limit: number) {
  try {
    const result = await this.service.findAllWithPagination(page, limit);
    return successPaginatedResponse(
      result.data, 
      result.total, 
      page, 
      limit, 
      'Items fetched successfully'
    );
  } catch (error) {
    throw new HttpException(
      errorResponse('Failed to fetch items', 'FETCH_ERROR', error.message),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
```

## 📝 Pattern chung cho tất cả Controller

```typescript
@Controller('your-module')
export class YourController {
  constructor(private readonly yourService: YourService) {}

  @Get()
  async getAll() {
    try {
      const items = await this.yourService.findAll();
      return successListResponse(items, 'Items fetched successfully');
    } catch (error) {
      throw new HttpException(
        errorResponse('Failed to fetch items', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      const item = await this.yourService.findOne(id);
      if (!item) {
        throw new HttpException(
          errorResponse('Item not found', 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      return successResponse(item, 'Item fetched successfully');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        errorResponse('Failed to fetch item', 'FETCH_ERROR', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
```

## 🎯 Lợi ích

1. **Nhất quán** - Tất cả API đều có cấu trúc giống nhau
2. **Dễ sử dụng** - Chỉ cần gọi helper function
3. **Type-safe** - Đầy đủ TypeScript support
4. **Dễ bảo trì** - Thay đổi ở một chỗ, áp dụng cho tất cả
5. **Linh hoạt** - Có thể customize meta data khi cần

## 📚 Ví dụ thực tế

Xem các file:
- `src/modules/banner/banner.controller.ts` - Banner controller đã áp dụng
- `src/modules/movies/movies.controller.example.ts` - Ví dụ cho Movies module
