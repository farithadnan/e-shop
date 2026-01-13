# Database Setup Guide

## ✅ What's Installed

- **Docker** - Running PostgreSQL 16
- **Prisma** - ORM for database access
- **PostgreSQL** - Database running in Docker container

## 🐳 Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker logs eshop-postgres

# Stop and remove data (fresh start)
docker-compose down -v
```

## 🗄️ Database Connection

**Connection String:** `postgresql://eshop:eshop123@localhost:5432/eshop_dev`

- **User:** eshop
- **Password:** eshop123
- **Database:** eshop_dev
- **Port:** 5432

## 📊 Prisma Commands

```bash
# Navigate to backend first
cd backend

# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name <migration_name>

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

## 📁 Important Files

- `docker-compose.yml` - Database configuration
- `backend/.env` - Database connection string
- `backend/prisma/schema.prisma` - Database schema
- `backend/prisma.config.ts` - Prisma configuration
- `backend/prisma/migrations/` - Migration history

## 🚀 Typical Workflow

1. **Start database:** `docker-compose up -d`
2. **Make schema changes** in `backend/prisma/schema.prisma`
3. **Create migration:** `cd backend && npx prisma migrate dev --name <change_description>`
4. **Prisma client auto-updates** after migration

## 🔍 Verify Setup

```bash
# Check if database is running
docker ps

# Test connection with Prisma Studio
cd backend
npx prisma studio
```

Then open http://localhost:5555 to see your database tables.

## 🛑 Troubleshooting

**Port 5432 already in use:**
- Change port in `docker-compose.yml`: `"5433:5432"`
- Update `.env`: `DATABASE_URL="postgresql://eshop:eshop123@localhost:5433/eshop_dev"`

**Can't connect to database:**
- Ensure Docker is running: `docker ps`
- Check logs: `docker logs eshop-postgres`
- Restart: `docker-compose restart`

**Prisma client not found:**
- Run: `npx prisma generate`
- Restart your IDE/terminal

## 🎓 Next Steps

You're ready for **Phase 1 - Product Catalog!**

See PROJECT.md for the next features to implement.
