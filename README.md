# 🍔 Food Delivery App (MERN Stack)

A **production-ready Food Delivery application** built using the **MERN stack**, featuring **role-based authentication**, **order lifecycle management**, **admin dashboard**, and **secure payments (COD / mock UPI)**.

This project demonstrates **real-world backend architecture**, clean frontend integration, and deployment-ready practices.

---

## 🚀 Features

### 👤 Authentication & Authorization

- JWT-based authentication (Access Tokens)
- Role-based access (`USER`, `ADMIN`)
- Secure password hashing with bcrypt
- Protected routes (Frontend + Backend)

---

### 🍽️ User Features

- Browse available food items
- Add/remove items from cart
- Place orders with delivery details
- Checkout with COD / Mock UPI
- Track order status
- View order history

---

### 🛠️ Admin Features

- Admin dashboard (KPIs)
  - Total Orders
  - Total Revenue
  - Pending Orders
  - Delivered Orders
- Manage menu items
  - Add / Edit / Delete menu
  - Toggle availability
- Manage orders
  - View all orders
  - Update order status
- Secure admin-only APIs

---

## 🧱 Tech Stack

### Frontend

- React (Vite)
- Material UI (MUI)
- Axios
- React Router
- Context API (Cart & Auth)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- PM2 (Production process manager)

### Dev & Infrastructure

- MongoDB Atlas
- PM2
- Vercel (Frontend deployment)

---

## 📂 Project Structure

### Backend

src/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── menu/
│ ├── order/
│ ├── payment/
│ └── admin/
├── middlewares/
├── utils/
├── routes/
└── server.js

### Frontend

src/
├── pages/
│ ├── auth/
│ ├── user/
│ └── admin/
├── components/
│ ├── admin/
│ └── layouts/
├── features/
├── services/
└── App.jsx





| Method | Endpoint                 | Description           |
| ------ | ------------------------ | -----------           |
| POST   | `/api/auth/register`     | Register user/admin   |
| POST   | `/api/auth/login`        | Login                 |
| GET    | `/api/menu`              | Get available menu    |
| GET    | `/api/menu/admin`        | Admin menu list       |
| POST   | `/api/orders`            | Place order           |
| GET    | `/api/orders/my`         | User orders           |
| PATCH  | `/api/orders/:id/status` | Update order status   |
| GET    | `/api/admin/dashboard`   | Admin dashboard stats |
