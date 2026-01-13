# 🛒 E-Shop - Full-Stack E-Commerce Project

A **learning-focused full-stack e-commerce system** built with **NestJS** backend, **Next.js** frontend, and **PostgreSQL** database.

> 📖 **Documentation:** [Project Roadmap](docs/PROJECT.md) · [Database Setup](docs/DATABASE_SETUP.md)

## 🛠️ Tech Stack

**Frontend:** Next.js 16 · React 19 · TypeScript · Tailwind CSS  
**Backend:** NestJS · PostgreSQL · Prisma ORM · TypeScript  
**Tools:** Docker · Git

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Docker (for PostgreSQL)
- npm or yarn

### Setup Steps

**1. Start Database**
```bash
docker-compose up -d
```

**2. Backend**
```bash
cd backend
npm install
npm run start:dev
```
→ Runs on http://localhost:4000

**3. Frontend**
```bash
cd frontend
npm install
npm run dev
```
→ Runs on http://localhost:3000

> 📖 **Detailed setup:** See [Database Setup Guide](docs/DATABASE_SETUP.md) for Prisma, migrations, and troubleshooting.

## 📚 Documentation

- **[Project Roadmap](docs/PROJECT.md)** - Phased development plan, goals, and learning objectives
- **[Prisma & PostgreSQL Guide](docs/PRISMA_POSTGRESQL_GUIDE.md)** - Beginner-friendly explanation (START HERE if new to Prisma!)
- **[Visual Guide](docs/VISUAL_GUIDE.md)** - Diagrams and visual explanations
- **[Database Setup Reference](docs/DATABASE_SETUP.md)** - Quick command reference

## 🗺️ Current Status

- ✅ **Phase 0:** Project setup & communication
- 🔄 **Phase 1:** Product catalog (read-only) - *In Progress*
- ⏳ **Phase 2:** Cart system
- ⏳ **Phase 3:** Users & orders
- ⏳ **Phase 4:** Admin panel

---

*This is a learning project. The goal is understanding, not perfection.*
