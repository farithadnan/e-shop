import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing products
  await prisma.product.deleteMany();
  console.log('🗑️  Cleared existing products');

  // Seed products
  const products = await prisma.product.createMany({
    data: [
      // Electronics
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling headphones with 30-hour battery life. Crystal clear sound quality and comfortable over-ear design.',
        price: 89.99,
        stock: 45,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        isActive: true,
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracker with heart rate monitor, GPS, and water resistance. Compatible with iOS and Android.',
        price: 249.99,
        stock: 28,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        isActive: true,
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: '360-degree sound with deep bass. Waterproof design perfect for outdoor adventures. 12-hour battery life.',
        price: 59.99,
        stock: 67,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        isActive: true,
      },
      {
        name: 'Wireless Gaming Mouse',
        description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons. Up to 16,000 DPI.',
        price: 79.99,
        stock: 52,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        isActive: true,
      },

      // Fashion
      {
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with a modern fit. Made from premium cotton for durability and comfort.',
        price: 79.99,
        stock: 35,
        category: 'Fashion',
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        isActive: true,
      },
      {
        name: 'Leather Crossbody Bag',
        description: 'Elegant genuine leather bag with adjustable strap. Multiple compartments for organization.',
        price: 129.99,
        stock: 22,
        category: 'Fashion',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        isActive: true,
      },
      {
        name: 'Premium Running Shoes',
        description: 'Lightweight athletic shoes with advanced cushioning technology. Perfect for running and everyday wear.',
        price: 119.99,
        stock: 41,
        category: 'Fashion',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        isActive: true,
      },

      // Home & Living
      {
        name: 'Minimalist Table Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for reading and working.',
        price: 45.99,
        stock: 58,
        category: 'Home & Living',
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        isActive: true,
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Each holds 12 oz.',
        price: 34.99,
        stock: 73,
        category: 'Home & Living',
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
        isActive: true,
      },
      {
        name: 'Aromatherapy Diffuser',
        description: 'Ultrasonic essential oil diffuser with 7-color LED lights. Whisper-quiet operation for better sleep.',
        price: 39.99,
        stock: 64,
        category: 'Home & Living',
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
        isActive: true,
      },

      // Books & Media
      {
        name: 'The Midnight Library',
        description: 'Bestselling fiction novel about life, regret, and infinite possibilities. Perfect for book club discussions.',
        price: 16.99,
        stock: 88,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        isActive: true,
      },
      {
        name: 'Atomic Habits',
        description: 'Practical strategies for forming good habits and breaking bad ones. A guide to building better systems.',
        price: 18.99,
        stock: 92,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500',
        isActive: true,
      },

      // Sports & Outdoors
      {
        name: 'Yoga Mat with Carrying Strap',
        description: 'Non-slip exercise mat made from eco-friendly materials. Extra thick for comfort during workouts.',
        price: 29.99,
        stock: 76,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        isActive: true,
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated 32oz bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.',
        price: 24.99,
        stock: 103,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
        isActive: true,
      },
      {
        name: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands with different tension levels. Includes carrying bag and exercise guide.',
        price: 19.99,
        stock: 85,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
        isActive: true,
      },

      // Out of stock example
      {
        name: 'Limited Edition Sneakers',
        description: 'Rare collectible sneakers. Check back soon for restocking information.',
        price: 199.99,
        stock: 0,
        category: 'Fashion',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
        isActive: true,
      },

      // Inactive product example
      {
        name: 'Old Model Phone Case',
        description: 'Discontinued product - no longer available.',
        price: 9.99,
        stock: 15,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500',
        isActive: false,
      },
    ],
  });

  console.log(`✅ Created ${products.count} products`);

  // Show summary by category
  const categories = await prisma.product.groupBy({
    by: ['category'],
    _count: { category: true },
    where: { isActive: true },
  });

  console.log('\n📊 Products by category:');
  categories.forEach((cat) => {
    console.log(`   ${cat.category}: ${cat._count.category} products`);
  });

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
