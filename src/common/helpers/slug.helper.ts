/**
 * Generate slug từ text
 * Ví dụ: "Avatar: Fire and Ash" -> "avatar-fire-and-ash"
 */
export const generateSlug = (text: string): string => {
  if (!text) return '';

  return text
    .toLowerCase() // Chuyển thành lowercase
    .trim() // Xóa khoảng trắng đầu/cuối
    .replace(/:/g, '') // Xóa dấu :
    .replace(/,/g, '') // Xóa dấu phẩy
    .replace(/\./g, '') // Xóa dấu chấm
    .replace(/'/g, '') // Xóa dấu ngoặc đơn
    .replace(/&/g, 'and') // Thay & thành and
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng -
    .replace(/-+/g, '-') // Xóa các - liên tiếp
    .replace(/^-+|-+$/g, ''); // Xóa - ở đầu/cuối
};

/**
 * Ví dụ sử dụng:
 * generateSlug("Avatar: Fire and Ash") // "avatar-fire-and-ash"
 * generateSlug("The Hunger Games") // "the-hunger-games"
 * generateSlug("Đấu Trường Sinh Tử") // "đấu-trường-sinh-tử"
 */
