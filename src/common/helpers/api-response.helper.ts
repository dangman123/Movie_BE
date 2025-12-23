/**
 * Helper functions để tạo API response nhất quán cho tất cả module
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    lastUpdated?: Date;
    [key: string]: any;
  };
  error?: {
    code: string;
    details?: string;
  };
}

/**
 * Tạo success response cho single item
 */
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: any
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    meta: {
      lastUpdated: new Date(),
      ...meta,
    },
  };
}

/**
 * Tạo success response cho list (không có pagination)
 */
export function successListResponse<T>(
  data: T[],
  meta?: any
): ApiResponse<T[]> {
  return {
    success: true,
    data,
    meta: {
      total: data.length,
      lastUpdated: new Date(),
      ...meta,
    },
  };
}

/**
 * Tạo success response cho list với pagination
 */
export function successPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number = 1,
  limit: number = 10,
  message?: string
): ApiResponse<T[]> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    data,
    message,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      lastUpdated: new Date(),
    },
  };
}

/**
 * Tạo error response
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  details?: string
): ApiResponse<null> {
  return {
    success: false,
    message,
    error: {
      code,
      details,
    },
  };
}
