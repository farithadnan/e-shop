import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * PrismaService - Manages database connection for the entire application
 * 
 * Why extend PrismaClient?
 * - We get all Prisma methods (product.findMany, etc.)
 * - We add NestJS lifecycle hooks (connect/disconnect)
 * 
 * Why OnModuleInit and OnModuleDestroy?
 * - OnModuleInit: Connect to database when app starts
 * - OnModuleDestroy: Disconnect when app shuts down (cleanup)
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Create PostgreSQL connection pool
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Create Prisma adapter for PostgreSQL
    const adapter = new PrismaPg(pool);

    // Initialize PrismaClient with the adapter
    super({
      adapter,
      log: ['error', 'warn'], // Log errors and warnings (helpful for debugging)
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
