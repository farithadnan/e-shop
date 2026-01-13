import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryProductsDto } from './dto/query-products.dto';
import { ProductResponseDto } from './dto/product-response.dto';

/**
 * ProductsController - Handles HTTP requests for products
 * 
 * Base route: /products
 * 
 * Routes:
 * - GET /products          → Get all products (with optional filters)
 * - GET /products/categories → Get unique categories
 * - GET /products/:id      → Get single product
 * 
 * Why this order matters:
 * - /products/categories MUST come before /products/:id
 * - Otherwise "categories" would be treated as an ID
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * GET /products
   * Get all products with optional filtering
   * 
   * Query parameters:
   * - category: Filter by category (e.g., ?category=Electronics)
   * - search: Search in name/description (e.g., ?search=headphone)
   * - isActive: Filter by active status (e.g., ?isActive=true)
   * 
   * Examples:
   * - GET /products
   * - GET /products?category=Electronics
   * - GET /products?search=phone&isActive=true
   * 
   * @Query decorator:
   * - Automatically extracts query parameters
   * - Validates against QueryProductsDto
   * - Converts types (string → boolean, etc.)
   */
  @Get()
  async findAll(@Query() query: QueryProductsDto): Promise<ProductResponseDto[]> {
    return this.productsService.findAll(query);
  }

  /**
   * GET /products/categories
   * Get list of unique categories
   * 
   * Useful for:
   * - Populating filter dropdowns
   * - Navigation menus
   * 
   * Returns: ["Electronics", "Fashion", "Books", ...]
   */
  @Get('categories')
  async getCategories(): Promise<string[]> {
    return this.productsService.getCategories();
  }

  /**
   * GET /products/:id
   * Get single product by ID
   * 
   * Example: GET /products/5
   * 
   * @Param decorator:
   * - Extracts route parameter (the :id part)
   * 
   * ParseIntPipe:
   * - Converts string "5" to number 5
   * - Returns 400 Bad Request if not a number
   * - Built-in validation!
   * 
   * Returns:
   * - 200 OK with product data
   * - 404 Not Found if product doesn't exist
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }
}

