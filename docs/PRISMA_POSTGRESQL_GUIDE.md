# 📚 Prisma & PostgreSQL Beginner's Guide

## 🤔 What Are These Tools?

### PostgreSQL (The Database)
Think of PostgreSQL as a **giant filing cabinet** that stores all your data in organized tables.

**Real-world analogy:**
- Your e-shop needs to remember products, users, orders, etc.
- PostgreSQL stores this data permanently (even when your server restarts)
- It's like Excel, but much more powerful and designed for applications

**Why PostgreSQL?**
- ✅ Free and open-source
- ✅ Very reliable and fast
- ✅ Great for relational data (products → orders → users)
- ✅ Industry standard

---

### Prisma (The Translator)
Prisma is a **translator** between your TypeScript code and PostgreSQL.

**The Problem Prisma Solves:**
- PostgreSQL speaks SQL (a database language)
- Your backend speaks TypeScript
- Writing SQL manually is tedious and error-prone
- Prisma lets you write TypeScript instead of SQL!

**Example:**

**Without Prisma (raw SQL):**
```typescript
const result = await db.query(
  'SELECT * FROM "Product" WHERE price < $1 AND isActive = $2',
  [100, true]
);
```

**With Prisma (TypeScript):**
```typescript
const products = await prisma.product.findMany({
  where: {
    price: { lt: 100 },
    isActive: true
  }
});
```

Much cleaner and type-safe! ✨

---

## 🏗️ How They Work Together

```
Your NestJS Backend
       ↓
   Prisma Client (translator)
       ↓
   PostgreSQL Database
       ↓
   Actual Data Storage (hard disk)
```

**The Flow:**
1. You write TypeScript code using Prisma
2. Prisma converts it to SQL
3. PostgreSQL executes the SQL
4. Data is saved/retrieved
5. Prisma converts results back to TypeScript objects

---

## 📁 What We Set Up - File by File

### 1. `docker-compose.yml` (Root folder)
**What it is:** Instructions for Docker to run PostgreSQL

**Why Docker?**
- No need to install PostgreSQL directly on your computer
- Easy to start/stop the database
- Isolated environment (won't mess with your system)
- Same setup works on any computer

**What's inside:**
```yaml
postgres:
  image: postgres:16-alpine  # Download PostgreSQL version 16
  ports:
    - "5432:5432"           # Make it accessible on port 5432
  environment:
    POSTGRES_USER: eshop      # Username to connect
    POSTGRES_PASSWORD: eshop123  # Password
    POSTGRES_DB: eshop_dev    # Database name
```

**Command to run:**
```bash
docker-compose up -d
```
This starts PostgreSQL in the background!

---

### 2. `backend/.env` (Environment Variables)
**What it is:** Secret configuration (passwords, URLs)

**Why separate file?**
- Keep secrets out of your code
- Different settings for dev/production
- Added to `.gitignore` so passwords aren't pushed to GitHub

**What's inside:**
```env
DATABASE_URL="postgresql://eshop:eshop123@localhost:5432/eshop_dev"
```

**Breaking it down:**
```
postgresql://     → Protocol (type of database)
eshop             → Username
:eshop123         → Password
@localhost        → Server address (your computer)
:5432             → Port number
/eshop_dev        → Database name
```

---

### 3. `backend/prisma/schema.prisma` (Database Blueprint)
**What it is:** A blueprint of your database structure (schema)

**Think of it as:** Designing your Excel spreadsheet before adding data

**Example:**
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

**Translation:**
- `model Product` → Create a table called "Product"
- `id Int @id` → Column named "id", type integer, primary key
- `@default(autoincrement())` → Auto-generate: 1, 2, 3, 4...
- `name String` → Column for text
- `price Decimal` → Column for money (e.g., 19.99)
- `@default(0)` → If not provided, use 0

**Key Concepts:**
- **Model** = Database Table
- **Field** = Column in that table
- **Type** = What kind of data (String, Int, Boolean, etc.)
- **@** symbols = Special instructions (decorators)

---

### 4. `backend/prisma.config.ts` (Prisma Settings)
**What it is:** Configuration for Prisma CLI tools

**What's inside:**
```typescript
export default defineConfig({
  schema: "prisma/schema.prisma",      // Where schema is located
  migrations: {
    path: "prisma/migrations",         // Where to save migrations
  },
  datasource: {
    url: process.env["DATABASE_URL"],  // Read from .env file
  },
});
```

This tells Prisma where everything is located.

---

### 5. `backend/prisma/migrations/` (Database History)
**What it is:** A history of all database changes

**Why migrations?**
- Track every change to your database structure
- Safely update production databases
- Team members can sync their databases
- Can rollback if something breaks

**Example:**
```
migrations/
  └─ 20260113065952_init/
      └─ migration.sql      ← SQL code that was executed
```

**The SQL inside:**
```sql
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    ...
);
```

**When you run:**
```bash
npx prisma migrate dev --name add_category
```

Prisma:
1. Compares your schema with the database
2. Generates SQL to make them match
3. Saves it in migrations folder
4. Applies it to the database

---

### 6. `backend/prisma/seed.ts` (Sample Data)
**What it is:** Script to fill database with test data

**Why needed?**
- Empty database is useless for testing
- Manually adding 100 products is tedious
- Everyone on the team gets same test data

**What it does:**
```typescript
const products = await prisma.product.createMany({
  data: [
    { name: 'Headphones', price: 89.99, ... },
    { name: 'Smart Watch', price: 249.99, ... },
    // ... 15 more products
  ]
});
```

**Run with:**
```bash
npm run seed
```

---

## 🔄 Common Workflows Explained

### **Workflow 1: Starting Fresh**
```bash
# 1. Start the database
docker-compose up -d

# 2. Create the database tables
cd backend
npx prisma migrate dev --name init

# 3. Add sample data
npm run seed
```

**What happens:**
1. PostgreSQL container starts
2. Prisma reads `schema.prisma`, generates SQL, creates tables
3. Seed script adds 17 products

---

### **Workflow 2: Changing the Database**

Let's say you want to add a `brand` field to products:

```bash
# 1. Edit schema.prisma
# Add: brand  String?

# 2. Create a migration
npx prisma migrate dev --name add_brand_field

# 3. Prisma does:
# - Detects the change
# - Generates SQL: ALTER TABLE "Product" ADD COLUMN "brand" TEXT;
# - Applies it to database
# - Updates TypeScript types
```

---

### **Workflow 3: Using Prisma in Code**

**Step 1: Create Prisma Service (NestJS pattern)**
```typescript
// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL 
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}
```

**Step 2: Use it in your code**
```typescript
// In any service
constructor(private prisma: PrismaService) {}

async getAllProducts() {
  // Get all active products
  return this.prisma.product.findMany({
    where: { isActive: true }
  });
}

async getProductById(id: number) {
  // Get one product
  return this.prisma.product.findUnique({
    where: { id }
  });
}

async createProduct(data) {
  // Create new product
  return this.prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
    }
  });
}
```

**Type safety:**
```typescript
// TypeScript knows what fields exist!
const product = await prisma.product.findFirst();
product.name    // ✅ OK
product.price   // ✅ OK
product.foo     // ❌ Error: Property 'foo' does not exist
```

---

## 🎯 Prisma Commands - Simplified

### **Development Commands:**

```bash
# Generate TypeScript client (after schema changes)
npx prisma generate
# → Creates TypeScript code in node_modules/@prisma/client
# → Now you can use prisma.product.findMany() etc.

# Create migration (after schema changes)
npx prisma migrate dev --name describe_your_change
# → Compares schema.prisma with actual database
# → Generates SQL migration
# → Applies it to database
# → Regenerates Prisma Client

# View database in browser
npx prisma studio
# → Opens GUI at http://localhost:5555
# → You can browse/edit data visually

# Seed database
npm run seed
# → Runs prisma/seed.ts
# → Fills database with test data

# Reset everything (fresh start)
npx prisma migrate reset
# → Deletes all data
# → Re-runs all migrations
# → Re-runs seed script
```

---

## 🧪 Testing Your Setup

### **1. Check if PostgreSQL is running:**
```bash
docker ps
```
Should show `eshop-postgres` container

### **2. Check if database has tables:**
```bash
docker exec eshop-postgres psql -U eshop -d eshop_dev -c "\dt"
```
Should show "Product" table

### **3. Check if products exist:**
```bash
cd backend
npx prisma studio
```
Open browser → should see 17 products

---

## 🤓 Advanced Concepts (Optional)

### **Why the Adapter Pattern in Prisma 7?**

In older Prisma versions:
```typescript
const prisma = new PrismaClient(); // Simple!
```

In Prisma 7 (what we're using):
```typescript
const pool = new Pool({ connectionString: '...' });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```

**Why the change?**
- More control over connections
- Better for serverless/edge environments
- Support for connection pooling
- More flexible for different deployment scenarios

For now, just copy the pattern - it's the new standard way.

---

### **What is Connection Pooling?**

**Without pooling:**
- Every request opens new database connection
- Slow! (connecting takes time)
- Limited connections (PostgreSQL has max ~100)

**With pooling (using `pg.Pool`):**
- Reuse existing connections
- Much faster
- Handles connection limits automatically

---

## 🆘 Common Errors & Solutions

### **Error: `Port 5432 already in use`**
**Problem:** Another PostgreSQL is running

**Solution:**
```bash
# Option 1: Stop other PostgreSQL
docker ps  # Find the container
docker stop <container-id>

# Option 2: Use different port
# In docker-compose.yml: "5433:5432"
# In .env: DATABASE_URL="...@localhost:5433/..."
```

---

### **Error: `Can't reach database server`**
**Problem:** Docker not running or container stopped

**Solution:**
```bash
docker ps  # Check if running
docker-compose up -d  # Start if not running
```

---

### **Error: `PrismaClient not found`**
**Problem:** Forgot to generate Prisma Client

**Solution:**
```bash
cd backend
npx prisma generate
```

---

### **Error: Schema out of sync**
**Problem:** Changed schema.prisma but didn't migrate

**Solution:**
```bash
npx prisma migrate dev --name fix_schema
```

---

## 📖 Learning Resources

**Official Docs:**
- [Prisma Docs](https://www.prisma.io/docs) - Very beginner-friendly!
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

**Quick Practice:**
1. Open Prisma Studio: `npx prisma studio`
2. Try adding a product manually
3. Try the Prisma Client API in code

---

## ✅ Summary - The Big Picture

**What you have now:**

1. **PostgreSQL** = Where data lives (products, users, orders)
2. **Docker** = Runs PostgreSQL easily
3. **Prisma Schema** = Blueprint of your database
4. **Migrations** = History of database changes
5. **Prisma Client** = TypeScript code to talk to database
6. **Seed Script** = Fills database with test data

**Your workflow:**
1. Design schema → `prisma/schema.prisma`
2. Create migration → `npx prisma migrate dev`
3. Use in code → `prisma.product.findMany()`
4. Everything is type-safe! ✨

**Next step:** Build the Product API endpoints using Prisma!

---

*Don't worry if this feels overwhelming - it clicks after you use it a few times! 🚀*
