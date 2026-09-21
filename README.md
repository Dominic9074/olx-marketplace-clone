# OLX Clone

A full-stack marketplace application inspired by OLX. Users can register, log in, post advertisements, browse products, and manage their listings.

## Features

- User authentication with JWT
- Create, update, and delete product listings
- Product image upload with Cloudinary
- Browse and view product details
- Product search, filtering, and sorting
- Redux Toolkit for global state management
- Form validation using Zod
- Protected routes and API endpoints
- Loading, error, and empty states

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- Axios
- React Hook Form
- Zod
- Vite

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Zod

### Services

- Cloudinary
- MongoDB Atlas

## Architecture

### Frontend

Components
    ↓
Redux Toolkit
    ↓
API Services
    ↓
Backend API

### Backend

Routes
    ↓
Middleware
    ↓
Controllers
    ↓
Services
    ↓
Models
    ↓
MongoDB

## Project Structure

OLX/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── features/
│       ├── services/
│       ├── store/
│       └── types/
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── schemas/
│       └── config/
│
└── README.md

## Installation

Clone the repository:

git clone <repository-url>

cd OLX

### Backend

cd server
npm install
npm run dev

### Frontend

cd client
npm install
npm run dev

## Environment Variables

### Backend

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### Frontend

VITE_API_URL=http://localhost:5000/api

## Authentication

The application uses JWT-based authentication with protected API routes.

Login
  ↓
JWT
  ↓
Authorization Header
  ↓
Auth Middleware
  ↓
Protected API

## Future Improvements

- Real-time buyer/seller chat
- Notifications
- Payment integration
- Reviews and ratings
- Advanced search
- Automated testing

## License

This project is built for learning and development purposes.
