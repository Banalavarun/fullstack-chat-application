# 💬 Fullstack Real-Time Chat Application

A fully-featured real-time chat application built using the **MERN stack**, with **Socket.IO** for real-time messaging and **Zustand** for global state management.

## 🚀 Features

- 🔐 User Authentication (Login, Signup) using JWT and Bcrypt
- 👥 Friend Request System (Send, Accept, Reject)
- 💬 Real-Time Chat Messaging via Socket.IO
- 📦 State Management using Zustand
- 🧠 Backend APIs with Express & MongoDB
- 🔄 Persistent chat history stored in MongoDB
- 📱 Responsive Design (UI can be improved with Tailwind/Material UI)

---
📌 Note
This project focuses on building a strong backend and core functionality first.

The UI is kept minimal for now, but can be upgraded using Tailwind CSS or Material UI.

Further improvements like message read indicators, media sharing, and typing status can be added.

## 🛠️ Tech Stack

### Frontend
- React
- Zustand
- Axios
- Vite
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT + Bcrypt
- CORS, Cookie-Parser, Dotenv


🧪 Backend Environment Variables (.env)
Make sure to create a .env file inside the /backend directory with the following variables:

.env
PORT=3000
CORS_ORIGIN=http://localhost:5173
MONGO_URL=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key

📂 Project Status
✅ Real-time backend & messaging complete
⏳ UI improvement and advanced features in progress







