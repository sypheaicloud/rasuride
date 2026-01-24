# 🚗 RasuRide - Premium Car Rental Platform

RasuRide is a full-stack car rental application designed for the Kenyan market. It features a modern React frontend, a high-performance FastAPI backend, and a cloud-native infrastructure.

## 🛠️ Technical Architecture

### 1. Database Layer: **Neon**
* **Provider**: Serverless PostgreSQL via Neon.
* **Connectivity**: Integrated using SQLAlchemy with the `postgresql://` dialect for secure, cloud-persistent storage of user data, car inventory, and booking history.

### 2. Identity & Security: **Google Cloud Auth**
* **Integration**: OAuth 2.0 via Google Cloud Console.
* **Access Control**: Secure "Continue with Google" login flow with built-in admin recognition for specified email addresses (e.g., djboziah@gmail.com).

### 3. Backend API: **Render**
* **Framework**: Python FastAPI.
* **Static Assets**: Configured with absolute pathing to serve car images from the `/uploads` directory.
* **Security**: CORS (Cross-Origin Resource Sharing) enabled to allow secure requests from the Vercel frontend.

### 4. Frontend Hosting: **Vercel**
* **Framework**: React + TypeScript + Tailwind CSS.
* **Image Optimization**: Implemented a hardcoded API anchor to `https://rasuride.onrender.com` to ensure consistent image loading across all production and preview domains.
* **CI/CD**: Automatic deployments triggered by GitHub pushes.

## 🚀 Deployment Workflow
1.  **Code** is pushed to **GitHub**.
2.  **Vercel** detects the push and rebuilds the frontend.
3.  **Render** restarts the backend API.
4.  **Neon** serves the persistent data to the API.

## 📝 Authors
* **Syphe IT Solutions** (Project Lead & Hybrid Cloud Architecture)