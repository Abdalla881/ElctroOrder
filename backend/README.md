# ⚡ ElctrOrder — Backend (NestJS REST API)

A robust, modular REST API built with **NestJS 11** and **MongoDB (Mongoose)**. It powers authentication, product management, order processing, image uploads, category filtering, and reporting.

---

## 🏗️ Architecture Overview

```
src/
├── app.module.ts            # Root module — wires everything together
├── main.ts                  # Bootstrap: CORS, global pipes, filters, interceptors
│
├── DataBase/                # Mongoose connection providers
├── auth/                    # JWT authentication (login, register, refresh)
│   ├── Controller/
│   ├── service/
│   ├── guards/              # JwtAuthGuard
│   └── dtos/
├── users/                   # User CRUD & profile management
├── items/                   # Product catalogue (CRUD + image upload)
├── orders/                  # Order placement & management
├── categories/              # Product category management
├── reports/                 # Sales/order reports
├── cloudinary/              # Image upload service (Cloudinary SDK)
├── email/                   # Transactional email (Nodemailer)
└── common/                  # Shared filters, interceptors, decorators
    ├── filters/
    │   ├── all-exceptions.filter.ts
    │   └── mongoose-validation.filter.ts
    └── interceptors/
        └── response.interceptor.ts
```

---

## 🔌 API Endpoints

> **Base URL:** `http://localhost:3000/api/v1`

### 🔐 Auth — `/api/v1/auth`

| Method | Endpoint         | Description               | Auth Required |
|--------|------------------|---------------------------|---------------|
| POST   | `/auth/register` | Register a new user       | ❌            |
| POST   | `/auth/login`    | Login & receive JWT token | ❌            |

---

### 👤 Users — `/api/v1/users`

| Method | Endpoint      | Description               | Auth Required |
|--------|---------------|---------------------------|---------------|
| GET    | `/users`      | Get all users (admin)     | ✅ JWT        |
| GET    | `/users/:id`  | Get single user by ID     | ✅ JWT        |
| PUT    | `/users/:id`  | Update user profile       | ✅ JWT        |
| DELETE | `/users/:id`  | Delete user (admin)       | ✅ JWT        |

---

### 📦 Items (Products) — `/api/v1/items`

| Method | Endpoint     | Description                          | Auth Required |
|--------|--------------|--------------------------------------|---------------|
| GET    | `/items`     | Get all items (supports filtering)   | ❌            |
| GET    | `/items/:id` | Get single item by ID                | ❌            |
| POST   | `/items`     | Create item (with image upload)      | ✅ JWT        |
| PUT    | `/items/:id` | Update item                          | ✅ JWT        |
| DELETE | `/items/:id` | Delete item                          | ✅ JWT        |

---

### 🛒 Orders — `/api/v1/orders`

| Method | Endpoint       | Description                        | Auth Required |
|--------|----------------|------------------------------------|---------------|
| GET    | `/orders`      | Get all orders (admin)             | ✅ JWT        |
| GET    | `/orders/:id`  | Get single order                   | ✅ JWT        |
| POST   | `/orders`      | Place a new order                  | ✅ JWT        |
| PUT    | `/orders/:id`  | Update order status                | ✅ JWT        |
| DELETE | `/orders/:id`  | Cancel / delete order              | ✅ JWT        |

---

### 🏷️ Categories — `/api/v1/categories`

| Method | Endpoint            | Description              | Auth Required |
|--------|---------------------|--------------------------|---------------|
| GET    | `/categories`       | List all categories      | ❌            |
| POST   | `/categories`       | Create a new category    | ✅ JWT        |
| PUT    | `/categories/:id`   | Update a category        | ✅ JWT        |
| DELETE | `/categories/:id`   | Delete a category        | ✅ JWT        |

---

### 📊 Reports — `/api/v1/reports`

| Method | Endpoint   | Description              | Auth Required |
|--------|------------|--------------------------|---------------|
| GET    | `/reports` | Get aggregated reports   | ✅ JWT        |

---

## ⚙️ Global Middleware & Config

| Feature                     | Implementation                        |
|-----------------------------|---------------------------------------|
| **Validation**              | `ValidationPipe` (whitelist + transform) |
| **Error Handling**          | `AllExceptionsFilter`, `MongooseValidationFilter` |
| **Response Wrapping**       | `ResponseInterceptor` — uniform JSON responses |
| **Logging**                 | Morgan (`dev` in development, `combined` in production) |
| **CORS**                    | Enabled for `http://localhost:8080`   |
| **Global API Prefix**       | `/api/v1`                             |

---

## 🌿 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# App
NODE_ENV=development
PORT=3000

# JWT
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=100d

# MongoDB
DATABASE_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/ElctrOrder?retryWrites=true&w=majority

# Cloudinary (image uploads)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer / SMTP)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

> ⚠️ **Never commit your real `.env` to version control.** Use `.gitignore` to exclude it.

---

## 📦 Key Dependencies

| Package                | Purpose                          |
|------------------------|----------------------------------|
| `@nestjs/core`         | NestJS framework core            |
| `@nestjs/jwt`          | JWT token generation/validation  |
| `@nestjs/passport`     | Passport.js integration          |
| `passport-jwt`         | JWT strategy for Passport        |
| `mongoose`             | MongoDB ODM                      |
| `bcrypt`               | Password hashing                 |
| `cloudinary`           | Cloud image upload               |
| `nodemailer`           | Sending emails                   |
| `class-validator`      | DTO validation decorators        |
| `class-transformer`    | Object transformation/serialization |
| `morgan`               | HTTP request logging             |

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Development (hot reload)
npm run start:dev

# Production build
npm run build
npm run start:prod

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

---

## 🧹 Code Quality

```bash
# Format code (Prettier)
npm run format

# Lint code (ESLint)
npm run lint
```
