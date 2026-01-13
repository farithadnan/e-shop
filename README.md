# 🛒 E-Shop - Full-Stack E-Commerce Project

A **learning-focused full-stack e-commerce system** built to understand how real-world online shops work end-to-end. This project features a **NestJS** backend API, **Next.js** frontend, and **PostgreSQL** database.

## 📌 Project Goals

- Build a complete e-commerce system with product catalog, cart, orders, and admin panel
- Learn modern full-stack architecture patterns
- Understand e-commerce domain concepts and workflows
- Practice clean code, API design, and database modeling

> 💡 **Note:** See [PROJECT.md](PROJECT.md) for the detailed phased development roadmap and learning objectives.

## 🏗️ Project Structure

```
e-shop/
├── backend/          # NestJS REST API server
│   └── src/         # Application source code
├── frontend/        # Next.js web application
│   └── app/         # App router pages and components
├── README.md        # Quick start & overview (this file)
└── PROJECT.md       # Detailed development roadmap
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** (App Router) - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **NestJS** - Progressive Node.js framework for building scalable server-side applications
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database toolkit and ORM
- **Jest** - Testing framework

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or yarn package manager
- **PostgreSQL** (for database - will be set up in Phase 1)

### Installation & Running

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run start:dev

# Or run in production mode
npm run build
npm run start:prod
```

The backend API will run on **http://localhost:4000**

**Available Backend Scripts:**
- `npm run start:dev` - Start development server with watch mode
- `npm run start` - Start server normally
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Lint code

#### 2. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Or build for production
npm run build
npm run start
```

The frontend will run on **http://localhost:3000** (may use 3001 if port 3000 is taken)

**Available Frontend Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code

### Running Both Simultaneously

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

## 📝 Development Notes

- **Phased Development:** The project is built incrementally (see [PROJECT.md](PROJECT.md) for phases)
- **Backend:** Uses NestJS's modular architecture with layered design (Controller → Service → Repository)
- **Frontend:** Uses Next.js App Router (modern approach with the `app/` directory)
- **Database:** PostgreSQL with Prisma ORM for type-safe database access
- **Code Quality:** ESLint configured in both projects, TypeScript for type safety

## 🔗 Default Ports

- **Backend:** http://localhost:4000
- **Frontend:** http://localhost:3000

## 🗺️ Development Phases

The project follows a structured learning path:

1. **Phase 0:** Project setup & communication ✅
2. **Phase 1:** Product catalog (read-only) - *Next*
3. **Phase 2:** Cart system (anonymous users)
4. **Phase 3:** Users & orders
5. **Phase 4:** Admin panel
6. **Phase 5:** Advanced features (optional)

> 📖 See [PROJECT.md](PROJECT.md) for detailed phase objectives and features.

## 🧠 Guiding Principles

- **One feature at a time** - Stay focused and complete each phase
- **Make it work first** - Functionality before optimization
- **Learn by doing** - Understand concepts through implementation
- **Clean code** - Prefer clarity over cleverness

---

*This is a learning project. The goal is understanding, not perfection.*
