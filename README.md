# 🍔 ElctrOrder — Full-Stack Food Ordering Platform

> A modern, full-stack food ordering platform — built with **NestJS**, **MongoDB**, **React 19**, and **TanStack Start**. Users can browse a food menu, place orders, and track them in real time, while admins manage items, categories, and orders through a rich dashboard.

---

## 📁 Project Structure

```
ElctrOrder/
├── backend/    # NestJS REST API (Node.js + MongoDB)
└── frontend/   # React 19 SPA (TanStack Start + Tailwind CSS v4)
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                                                       |
|------------|----------------------------------------------------------------------------------|
| Backend    | NestJS 11, TypeScript, Mongoose (MongoDB), Passport JWT, Cloudinary, Nodemailer  |
| Frontend   | React 19, TanStack Router/Query/Start, Tailwind CSS v4, Radix UI, Zod, Zustand   |
| Database   | MongoDB Atlas                                                                    |
| Auth       | JWT (Access Tokens) + bcrypt password hashing                                   |
| Media      | Cloudinary (food image upload & storage)                                         |
| Email      | Nodemailer (SMTP) — order confirmations & password reset codes                  |

---

## ✨ Key Features

- 🛒 **Browse & Order** — Customers browse a food menu filtered by category and add items to their cart
- 🔐 **JWT Authentication** — Secure register/login flow with protected routes
- 🔑 **Forgot Password** — 3-step email reset flow: request code → verify code → set new password
- 📦 **Order Management** — Place, track, update, and cancel orders
- 🏷️ **Category Filtering** — Filter food items by category (Burgers, Pizza, Drinks, etc.)
- 🖼️ **Image Uploads** — Food item images stored on Cloudinary
- 📊 **Admin Dashboard** — Reports, sales analytics, and full CRUD for items & orders
- 📧 **Email Notifications** — Order confirmations & reset codes sent via Nodemailer
- 🔔 **Toast Notifications** — Real-time success/error toasts powered by **Sonner**
- 🌍 **i18n Support** — Multi-language frontend via react-i18next

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or **bun** for the frontend)
- **MongoDB Atlas** URI (or local MongoDB)
- **Cloudinary** account (free tier works)
- **SMTP credentials** (for password reset emails)

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

API available at: `http://localhost:3000/api/v1`

### 3. Setup & Run Frontend

```bash
cd frontend
cp .env.example .env   # set VITE_API_URL if needed
npm install
npm run dev
```

App available at: `http://localhost:8080`

---

## 🔌 API Overview

> **Base URL:** `http://localhost:3000/api/v1`

| Module         | Endpoint prefix       | Description                             |
|----------------|-----------------------|-----------------------------------------|
| 🔐 Auth        | `/auth`               | Register, login, forgot/reset password  |
| 👤 Users       | `/users`              | User profile management                 |
| 🍽️ Items       | `/items`              | Food menu CRUD + image upload           |
| 🛒 Orders      | `/orders`             | Place & manage food orders              |
| 🏷️ Categories  | `/categories`         | Food category management                |
| 📊 Reports     | `/reports`            | Sales & order analytics                 |

See [`backend/README.md`](./backend/README.md) for the full endpoint reference.

---

## 📖 Detailed Documentation

- [Backend README](./backend/README.md) — API endpoints, modules, environment variables
- [Frontend README](./frontend/README.md) — routes, components, state management

---

## 📄 License

This project is **UNLICENSED** — for educational / portfolio purposes.
