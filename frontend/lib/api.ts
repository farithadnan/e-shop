/**
 * API Client - Centralized fetch wrapper for backend API calls
 * 
 * Why create this?
 * - Single place to configure API URL
 * - Consistent error handling
 * - Easy to add auth headers later
 * - TypeScript types for API responses
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Product type (matches backend ProductResponseDto)
 */
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Query parameters for filtering products
 */
export interface ProductFilters {
  category?: string;
  search?: string;
  isActive?: boolean;
}

/**
 * Generic API error class
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Base fetch wrapper with error handling
 * 
 * Why async/await?
 * - Cleaner than .then() chains
 * - Better error handling
 */
async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(response.status, error.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Network errors, etc.
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

/**
 * API Methods
 */
export const api = {
  /**
   * Get all products with optional filters
   * 
   * Example:
   * - api.products.getAll()
   * - api.products.getAll({ category: 'Electronics' })
   * - api.products.getAll({ search: 'phone' })
   */
  products: {
    async getAll(filters?: ProductFilters): Promise<Product[]> {
      // Build query string from filters
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));

      const query = params.toString();
      const endpoint = `/products${query ? `?${query}` : ''}`;

      return fetchApi<Product[]>(endpoint);
    },

    /**
     * Get single product by ID
     */
    async getById(id: number): Promise<Product> {
      return fetchApi<Product>(`/products/${id}`);
    },

    /**
     * Get unique categories
     */
    async getCategories(): Promise<string[]> {
      return fetchApi<string[]>('/products/categories');
    },
  },
};
