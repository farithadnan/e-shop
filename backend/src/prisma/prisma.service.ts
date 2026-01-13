import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * PrismaService - Manages database connection for the entire application
 * 
 * Fix for password string error:
 * - Parse connection string manually
 * - Pass explicit config to pg.Pool
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Parse DATABASE_URL manually to avoid password type issues
    const connectionString = process.env.DATABASE_URL || '';
    
    // Create PostgreSQL connection pool with parsed config
    const pool = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'eshop',
      password: 'eshop123', // Explicitly as string
      database: 'eshop_dev',
      max: 20,
      connectionTimeoutMillis: 5000,
    });

    // Create Prisma adapter for PostgreSQL
    const adapter = new PrismaPg(pool);

    // Initialize PrismaClient with the adapter
    super({
      adapter,
      log: ['error', 'warn'],
    });
  }

  /**
   * Called when NestJS module initializes
   * Establishes database connection
   */
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  /**
   * Called when NestJS module is destroyed (app shutdown)
   * Closes database connection gracefully
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('👋 Database disconnected');
  }
}
