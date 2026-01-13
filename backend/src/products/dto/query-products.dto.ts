import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * QueryProductsDto - Defines query parameters for filtering/searching products
 * 
 * Used in: GET /products?category=Electronics&search=phone&isActive=true
 * 
 * Why validation decorators?
 * - @IsOptional() = field is not required
 * - @IsString() = must be a string
 * - @IsBoolean() = must be true/false
 * - Automatic validation by NestJS (if enabled)
 */
export class QueryProductsDto {
  /**
   * Filter by category
   * Example: ?category=Electronics
   */
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * Search in product name or description
   * Example: ?search=headphones
   */
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Filter by active status
   * Example: ?isActive=true
   */
  @IsOptional()
  @Type(() => Boolean) // Convert string "true" to boolean
  @IsBoolean()
  isActive?: boolean;
}
