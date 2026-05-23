# 🍔 ElctrOrder — Frontend (React 19 + TanStack Start)

A fast, modern food ordering frontend built with **React 19**, **TanStack Router/Query/Start**, **Tailwind CSS v4**, and **Radix UI**. Customers can browse the food menu, add items to their cart, and place orders. Admins get a full dashboard to manage food items, categories, and orders.

---

## 🛠️ Tech Stack

| Library                  | Purpose                                           |
|--------------------------|---------------------------------------------------|
| React 19                 | UI framework                                      |
| TanStack Router          | Type-safe file-based routing                      |
| TanStack Query           | Server state management & data fetching           |
| TanStack Start           | Full-stack React framework (SSR support)          |
| Tailwind CSS v4          | Utility-first styling                             |
| Radix UI                 | Accessible, unstyled UI primitives                |
| Zustand                  | Lightweight client-side state (cart, auth)        |
| Zod + React Hook Form    | Form validation                                   |
| **Sonner**               | Toast notifications (success / error / info)      |
| react-i18next / i18next  | Internationalization (multi-language)             |
| Recharts                 | Admin dashboard charts & analytics                |
| Lucide React             | Icon library                                      |

---

## 🗂️ Routes

| Route                  | Description                                   | Auth Required |
|------------------------|-----------------------------------------------|---------------|
| `/`                    | Home — featured food items & categories       | ❌            |
| `/menu`                | Full food menu with category filtering        | ❌            |
| `/cart`                | Shopping cart                                 | ❌            |
| `/checkout`            | Order placement                               | ✅            |
| `/orders`              | Customer order history                        | ✅            |
| `/orders/:id`          | Order detail & tracking                       | ✅            |
| `/login`               | Login page (with "Forgot password?" link)     | ❌            |
| `/register`            | Registration page                             | ❌            |
| `/forgot-password`     | 3-step password reset (email → code → new pw)| ❌            |
| `/admin`               | Admin dashboard (protected)                   | ✅ Admin      |
| `/admin/products`      | Manage food menu items                        | ✅ Admin      |
| `/admin/orders`        | Manage incoming orders                        | ✅ Admin      |

---

## 🔑 Forgot Password Flow

The `/forgot-password` page has three inline steps, no page reloads:

1. **Request** — Enter email → backend sends a reset code (valid 10 min)
2. **Verify** — Paste the code from the email → backend confirms it
3. **Reset** — Enter & confirm new password → redirects to `/login`

Every step shows a **Sonner** toast (success or error).

---

## 🔔 Toast Notifications

**Sonner** is configured globally in `__root.tsx`:

```tsx
<Toaster theme="dark" position="top-center" richColors />
```

Used across the app for login, register, order placement, admin CRUD, and the forgot-password flow via `import { toast } from "sonner"`.

---

## 🌐 API Services

| File                     | Covers                                             |
|--------------------------|----------------------------------------------------|
| `services/api.ts`        | `apiRequest` helper + token storage                |
| `services/authService.ts`| login, register, logout, forgetPassword, verifyResetCode, resetPassword |
| `services/productService.ts` | getProducts, getCategories, createProduct, updateProduct, deleteProduct |
| `services/orderService.ts`   | createOrder, getOrders, getOrder, updateOrderStatus |

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## 🚀 Running the Frontend

```bash
# Install dependencies
npm install   # or: bun install

# Development server (hot reload)
npm run dev   # or: bun run dev

# Production build
npm run build

# Preview production build
npm run preview
```

App will be available at: `http://localhost:8080`

---

## 🧹 Code Quality

```bash
# Lint code (ESLint)
npm run lint

# Format code (Prettier)
npm run format
```

---

## 🔗 Backend

This frontend consumes the [ElctrOrder Backend API](../backend/README.md) running at `http://localhost:3000/api/v1`.
