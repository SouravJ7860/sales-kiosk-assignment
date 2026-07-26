# 🏢 Sales Kiosk Application

A full-stack real-time Sales Kiosk application built as part of the Convrse Backend Developer assignment.

The application simulates a real estate showroom where sales executives can present project images, play promotional videos, browse apartment inventory, and book available units while keeping every connected device synchronized in real time.

---

![React](https://img.shields.io/badge/React-19-blue)

![Node.js](https://img.shields.io/badge/Node.js-Express-green)

![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)

![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-black)

# 🚀 Live Demo

Frontend:
https://sales-kiosk-assignment.vercel.app

Backend:
https://sales-kiosk-assignment.onrender.com

---

# 📹 Demo Video

> Add Loom / Google Drive / YouTube link here

---

# 📖 Project Overview

The application provides a synchronized showroom experience across multiple devices.

Features include:

- Browse project gallery
- Watch promotional videos
- View apartment inventory
- Book available units
- Prevent duplicate bookings using atomic transactions
- Real-time synchronization across connected devices
- Screen mirroring between multiple browser windows/devices

---

# ✨ Features

## Gallery

- Fetch images from backend
- Responsive gallery layout
- Full-screen image preview
- Loading state
- Error state
- Real-time synchronized image preview

---

## Videos

- Fetch videos from backend
- Browser video player
- Loading state
- Error state
- Video playback synchronization using Socket.IO

---

## Inventory

- Tower-wise inventory
- Responsive inventory dashboard
- Booking modal
- Customer Name
- Phone Number
- Booking validation
- Success & error messages
- Loading spinner
- Error handling
- Automatic inventory updates

---

## Real-Time Synchronization

Implemented using Socket.IO.

Supports synchronization of:

- Active page navigation
- Image preview
- Video playback
- Booking dialog
- Inventory updates
- Unit booking

---

## Atomic Booking

The backend prevents duplicate bookings.

If two users attempt to book the same apartment simultaneously:

- First request succeeds
- Second request fails

MongoDB transactions ensure booking consistency and eliminate race conditions.

---

# 🌟 Beyond the Scope

Implemented an additional product-oriented feature beyond the assignment requirements.

## Live Inventory Dashboard

The Inventory page displays:

- Total Units
- Available Units
- Booked Units
- Tower-wise availability

Example:

Tower A → 7 / 10 Available

Tower B → 10 / 10 Available

Tower C → 9 / 10 Available

This provides sales executives with a quick overview of inventory availability while presenting projects to customers.

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- Socket.IO Client
- React Toastify
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

---

# 📂 Project Structure

```
Sales-Kiosk
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── socket
│   ├── seed
│   └── server.js
│
├── frontend
│   ├── components
│   ├── layout
│   ├── pages
│   ├── services
│   ├── socket
│   └── App.jsx
│
└── README.md
```

---

# ⚙ Installation

## Clone repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

PORT=5000
MONGODB_URI=<Your MongoDB Atlas Connection String>
CLIENT_URL=https://sales-kiosk-assignment.vercel.app

## Frontend (.env)

VITE_API_URL=https://sales-kiosk-assignment.onrender.com


# 📡 API Endpoints

## Gallery

```
GET /api/gallery
```

---

## Videos

```
GET /api/videos
```

---

## Inventory

```
GET /api/inventory
```

---

## Booking

```
POST /api/book
```

---

# 🔄 Socket Events

| Event | Description |
|--------|-------------|
| booking:open | Open booking dialog |
| booking:close | Close booking dialog |
| unitBooked | Refresh inventory |
| gallery:open | Open gallery preview |
| gallery:close | Close gallery preview |
| video:play | Synchronize video playback |
| video:pause | Synchronize video pause |
| route:change | Synchronize navigation |

---

# 🗄 Database Collections

- Gallery
- Videos
- Inventory
- Bookings

---

# 🧪 Seed Data

To populate the database:

```bash
cd backend

npm run seed
```

This creates:

- Gallery images
- Videos
- Inventory (30 Units)

---

# 🧠 Architecture

Frontend communicates with the backend using REST APIs.

Real-time communication is handled separately using Socket.IO.

Booking requests are processed using MongoDB transactions to ensure atomicity.

Inventory updates are immediately broadcast to all connected clients.

---

# ⚠ Known Limitations

Modern browsers prevent autoplay of media without prior user interaction.

Therefore, synchronized video playback may require the user to interact with the page once before playback is allowed.

This is a browser security restriction rather than an application limitation.

---

# 🚀 Future Improvements

- Authentication & user roles
- Search & filtering
- Booking history
- Admin dashboard
- Analytics
- Offline caching
- Unit tests
- Docker support

---

# 👨‍💻 Author

**Sourav Jangra**

Backend / Full Stack Developer
