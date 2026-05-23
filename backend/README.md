# 🍔 ElctrOrder — Backend (NestJS REST API)

A robust, modular REST API built with **NestJS 11** and **MongoDB (Mongoose)**. It powers authentication (including full forgot-password flow), food menu management, order processing, image uploads, category filtering, and sales reporting.

---

## 🏗️ Architecture Overview

```
src/
├── app.module.ts            # Root module — wires everything together
├── main.ts                  # Bootstrap: CORS, global pipes, filters, interceptors
│
├── DataBase/                # Mongoose connection providers
├── auth/                    # JWT authentication (login, register, forgot/reset password)
│   ├── Controller/
│   ├── service/
│   ├── guards/              # JwtAuthGuard
│   └── dtos/
├── users/                   # User CRUD & profile management
├── items/                   # Food menu management (CRUD + image upload)
├── orders/                  # Order placement & management
├── categories/              # Food category management
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

| Method | Endpoint                  | Description                                         | Auth Required |
|--------|---------------------------|-----------------------------------------------------|---------------|
| POST   | `/auth/signup`            | Register a new user                                 | ❌            |
| POST   | `/auth/login`             | Login & receive JWT token                           | ❌            |
| POST   | `/auth/forget-password`   | Request password reset — sends code via email       | ❌            |
| POST   | `/auth/verify-reset-code` | Verify the 6-char reset code                        | ❌            |
| PUT    | `/auth/reset-password`    | Set new password (after code verified)              | ❌            |

> **Forgot password flow:**
> 1. `POST /auth/forget-password` with `{ email }` → sends a reset code via email (valid 10 min)
> 2. `POST /auth/verify-reset-code` with `{ email, resetCode }` → marks code as verified
> 3. `PUT /auth/reset-password` with `{ email, newPassword }` → updates password

---

### 👤 Users — `/api/v1/users`

| Method | Endpoint      | Description               | Auth Required |
|--------|---------------|---------------------------|---------------|
| GET    | `/users`      | Get all users (admin)     | ✅ JWT        |
| GET    | `/users/:id`  | Get single user by ID     | ✅ JWT        |
| PUT    | `/users/:id`  | Update user profile       | ✅ JWT        |
| DELETE | `/users/:id`  | Delete user (admin)       | ✅ JWT        |

---

### 🍽️ Items (Food Menu) — `/api/v1/items`

| Method | Endpoint      | Description                              | Auth Required |
|--------|---------------|------------------------------------------|---------------|
| GET    | `/items`      | Get all food items (supports filtering)  | ❌            |
| GET    | `/items/:id`  | Get single food item by ID               | ❌            |
| POST   | `/items`      | Create food item (with image upload)     | ✅ JWT        |
| PATCH  | `/items/:id`  | Update food item                         | ✅ JWT        |
| DELETE | `/items/:id`  | Delete food item                         | ✅ JWT        |

---

### 🛒 Orders — `/api/v1/orders`

| Method | Endpoint       | Description                   | Auth Required |
|--------|----------------|-------------------------------|---------------|
| GET    | `/orders`      | Get all orders (admin)        | ✅ JWT        |
| GET    | `/orders/:id`  | Get single order              | ✅ JWT        |
| POST   | `/orders`      | Place a new food order        | ✅ JWT        |
| PATCH  | `/orders/:id`  | Update order status           | ✅ JWT        |
| DELETE | `/orders/:id`  | Cancel / delete order         | ✅ JWT        |

---

### 🏷️ Categories — `/api/v1/categories`

| Method | Endpoint            | Description                    | Auth Required |
|--------|---------------------|--------------------------------|---------------|
| GET    | `/categories`       | List all food categories       | ❌            |
| POST   | `/categories`       | Create a new food category     | ✅ JWT        |
| PUT    | `/categories/:id`   | Update a food category         | ✅ JWT        |
| DELETE | `/categories/:id`   | Delete a food category         | ✅ JWT        |

---

### 📊 Reports — `/api/v1/reports`

| Method | Endpoint   | Description                        | Auth Required |
|--------|------------|------------------------------------|---------------|
| GET    | `/reports` | Get aggregated sales/order reports | ✅ JWT        |

---

## ⚙️ Global Middleware & Config

| Feature                     | Implementation                           |
|-----------------------------|------------------------------------------|
| **Validation**              | `ValidationPipe` (whitelist + transform) |
| **Error Handling**          | `AllExceptionsFilter`, `MongooseValidationFilter` |
| **Response Wrapping**       | `ResponseInterceptor` — uniform JSON responses |
| **Logging**                 | Morgan (`dev` in development, `combined` in production) |
| **CORS**                    | Enabled for `http://localhost:8080`      |
| **Global API Prefix**       | `/api/v1`                                |

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

# Cloudinary (food image uploads)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer / SMTP) — order confirmations & password reset codes
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

> ⚠️ **Never commit your real `.env` to version control.** Use `.gitignore` to exclude it.

---

## 📦 Key Dependencies

| Package                | Purpose                                   |
|------------------------|-------------------------------------------|
| `@nestjs/core`         | NestJS framework core                     |
| `@nestjs/jwt`          | JWT token generation/validation           |
| `@nestjs/passport`     | Passport.js integration                   |
| `passport-jwt`         | JWT strategy for Passport                 |
| `mongoose`             | MongoDB ODM                               |
| `bcrypt`               | Password hashing & reset code hashing     |
| `crypto`               | Secure random reset code generation       |
| `cloudinary`           | Cloud image upload (food photos)          |
| `nodemailer`           | Order confirmation & password reset emails|
| `class-validator`      | DTO validation decorators                 |
| `class-transformer`    | Object transformation/serialization       |
| `morgan`               | HTTP request logging                      |

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
