# ⚡ ElctrOrder — Full-Stack Electronics Ordering Platform

> ⚠️ **IMPORTANT NOTICE**
>
> This project is still under development and is not fully completed yet due to tight deadline constraints.
>
> The current version includes the main backend architecture, frontend implementation, and core authentication + API structure.
>
> The next planned steps are:
> - Payment integration system
> - Production deployment on Vercel
> - Final polishing and optimization
>
> This repository is shared for technical evaluation and portfolio/demo purposes.

> A modern, full-stack e-commerce platform for electronics ordering — built with **NestJS**, **MongoDB**, **React 19**, and **TanStack Start**.

---

## 📁 Project Structure

```
ElctrOrder/
├── backend/    # NestJS REST API (Node.js + MongoDB)
└── frontend/   # React 19 SPA (TanStack Start + Tailwind CSS v4)
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                                                    |
|------------|-------------------------------------------------------------------------------|
| Backend    | NestJS 11, TypeScript, Mongoose (MongoDB), Passport JWT, Cloudinary, Nodemailer |
| Frontend   | React 19, TanStack Router/Query/Start, Tailwind CSS v4, Radix UI, Zod, Zustand  |
| Database   | MongoDB Atlas                                                                 |
| Auth       | JWT (Access Tokens) + bcrypt password hashing                                |
| Media      | Cloudinary (image upload & storage)                                          |
| Email      | Nodemailer (SMTP)                                                             |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB Atlas** URI (or local MongoDB)
- **Cloudinary** account (free tier works)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ElctrOrder
```

### 2. Setup & Run Backend

```bash
cd backend
cp .env.example .env   # fill in your secrets
npm install
npm run start:dev
```

API will be available at: `http://localhost:3000/api/v1`

### 3. Setup & Run Frontend

```bash
cd frontend
cp .env.example .env   # set VITE_API_URL if needed
npm install
npm run dev
```

App will be available at: `http://localhost:8080`

---

## 📖 Detailed Documentation

- [Backend README](./backend/README.md) — API endpoints, modules, environment variables
- [Frontend README](./frontend/README.md) — routes, components, state management

---

## 📄 License

This project is **UNLICENSED** — for educational / portfolio purposes.
