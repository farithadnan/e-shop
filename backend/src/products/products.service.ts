import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryProductsDto } from './dto/query-products.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Prisma } from '@prisma/client';

/**
 * ProductsService - Business logic for product operations
 * 
 * Responsibilities:
 * 1. Query database using Prisma
 * 2. Apply filters and search
 * 3. Transform data to DTOs
 * 4. Handle errors
 */
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all products with optional filtering
   * 
   * @param query - Query parameters (category, search, isActive)
   * @returns Array of products
   * 
   * How filtering works:
   * 1. Build a "where" clause dynamically
   * 2. Add conditions only if provided
   * 3. Prisma generates optimized SQL
   */
  async findAll(query: QueryProductsDto): Promise<ProductResponseDto[]> {
    // Build filter conditions dynamically
    const where: Prisma.ProductWhereInput = {};

    // Filter by category (exact match)
    if (query.category) {
      where.category = query.category;
    }

    // Filter by active status (default: show only active products)
    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    } else {
      where.isActive = true; // Default: only active products
    }

    // Search in name or description (case-insensitive)
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // Query database
    const products = await this.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }, // Newest first
    });

    // Convert to DTOs (Decimal → number)
    return products.map((product) => ProductResponseDto.fromPrisma(product));
  }

  /**
   * Find one product by ID
   * 
   * @param id - Product ID
   * @returns Single product
   * @throws NotFoundException if product doesn't exist
   * 
   * Why throw NotFoundException?
   * - NestJS automatically converts it to HTTP 404
   * - Clear error message for clients
   * - Follows REST conventions
   */
  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return ProductResponseDto.fromPrisma(product);
  }

  /**
   * Get unique categories (for filter dropdown)
   * Useful for frontend to show available categories
   */
  async getCategories(): Promise<string[]> {
    const result = await this.prisma.product.groupBy({
      by: ['category'],
      where: { isActive: true, category: { not: null } },
    });

    return result
      .map((item) => item.category)
      .filter((cat): cat is string => cat !== null);
  }
}

