import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule - Makes PrismaService available throughout the app
 * 
 * @Global() decorator:
 * - Makes this module available everywhere without importing it
 * - We only need to import PrismaModule once in AppModule
 * - All other modules can use PrismaService automatically
 * 
 * Why this pattern?
 * - Single database connection shared across app
 * - Clean and maintainable
 * - Follows NestJS best practices
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Make PrismaService available to other modules
})
export class PrismaModule {}
