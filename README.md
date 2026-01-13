# E-Shop Project

A simple e-commerce application built with a modern tech stack, featuring a **NestJS** backend API and a **Next.js** frontend.

## 🏗️ Project Structure

```
e-shop/
├── backend/          # NestJS REST API server
│   └── src/         # Application source code
└── frontend/        # Next.js web application
    └── app/         # App router pages and components
```

## 🛠️ Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework for building efficient server-side applications
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework (used by NestJS)
- **Jest** - Testing framework

### Frontend
- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

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

The backend API will run on **http://localhost:3000**

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

The frontend will run on **http://localhost:3001** (or 3000 if backend isn't running)

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

- The backend uses NestJS's modular architecture for organizing code
- The frontend uses Next.js App Router (modern approach with the `app/` directory)
- Both projects include ESLint for code quality
- TypeScript is configured for type safety across the entire stack

## 🔗 Default Ports

- **Backend:** http://localhost:4000
- **Frontend:** http://localhost:3000 (may vary based on available ports)

---

*This is a starter template. Build your e-commerce features on top of this foundation!*
