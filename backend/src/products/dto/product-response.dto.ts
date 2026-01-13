/**
 * ProductResponseDto - Defines the shape of product data sent to clients
 * 
 * Why create this when we have Prisma types?
 * 1. We can exclude sensitive fields (e.g., internal IDs)
 * 2. We can add computed fields
 * 3. Frontend gets clear type definitions
 * 4. API contract is explicit
 */
export class ProductResponseDto {
  id: number;
  name: string;
  description: string | null;
  price: number; // Converted from Decimal to number for JSON
  stock: number;
  category: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Helper method to convert Prisma Product to DTO
   * Handles Decimal to number conversion
   */
  static fromPrisma(product: any): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.toString()), // Decimal → number
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
