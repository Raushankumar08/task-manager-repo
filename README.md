# 🚀 Task Manager App

A full-stack task management system with authentication, role-based access, and team task assignment.

---

## 📌 Overview

This application helps teams manage tasks efficiently with secure authentication, role-based permissions, and a clean modern dashboard.
Users can create, assign, track, and update tasks in real time.

---

## ✨ Features

* 🔐 JWT Authentication (Login / Signup)
* 👥 Role-based access (Admin / Member)
* ✅ Create, assign, and manage tasks
* 📊 Dashboard with real-time stats
* 🔍 Search & filter tasks
* ⏰ Overdue task highlighting
* 🧑‍💼 Assign users to tasks
* 🎯 Status tracking (Todo / In Progress / Done)
* 📱 Responsive UI (mobile-friendly)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📂 Project Structure

task-manager/
├── client/        # Frontend (React)
├── task-manager/  # Backend (Node + Express)
├── README.md
├── .env.example

---

## ⚙️ Setup Instructions

### 🔹 Clone Repository

git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager

---

### 🔹 Backend Setup

cd task-manager
npm install
npm run dev

---

### 🔹 Frontend Setup

cd ../client
npm install
npm run dev

---

## 🔐 Environment Variables

Create a `.env` file inside `task-manager/`:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

---

## 👤 Demo Credentials

| Role   | Email                                 | Password |
| ------ | ------------------------------------- | -------- |
| Admin  | [test@test.com](mailto:test@test.com) | 123456   |
| Member | [user@test.com](mailto:user@test.com) | 123456   |

---

## 📊 Key Functionalities

### 👑 Admin

* Create tasks
* Assign tasks to users
* View all tasks
* Monitor dashboard stats

### 👤 Member

* View assigned tasks
* Update task status

---

## 🚀 Deployment

### Backend

Deploy using:

* Render
* Railway

### Frontend

Deploy using:

* Vercel

👉 Update API base URL in:
client/src/services/api.js

---

## 📸 Screenshots

* Dashboard with stats (Total / Done / Pending)
* Task list with status controls
* Sidebar navigation
* Profile page

---

## 📈 Future Improvements

* 🔔 Notifications system
* 📊 Charts & analytics
* 🧲 Drag & drop tasks
* 📅 Due date reminders
* 🌐 Multi-project support

---

## 👨‍💻 Author

Raushan Kumar

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
