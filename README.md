# FitForge

![Project Banner](https://i.ibb.co/7tYM1mdF/image.png)

## Table of Contents

1. [About the Project](#about-the-project)
2. [Live Demo](#live-demo)
3. [Admin Credentials](#admin-credentials)
4. [Technologies Used](#technologies-used)
5. [Installation & Setup](#installation--setup)
6. [Features](#features)
7. [Project Structure](#project-structure)
8. [Environment Variables](#environment-variables)
9. [Available Scripts](#available-scripts)
10. [License](#license)

---

## About the Project

FitForge is a MERN-stack Fitness Tracker platform designed to help users track workouts, set goals, and engage with a vibrant community. It supports Admin, Trainer, and Member roles with role-based access, secure authentication, and seamless CRUD operations powered by React, Node.js, Express, MongoDB, and Stripe.

## Live Demo

[View the live site](https://fitforge-8d026.web.app/)

## Admin Credentials

- **Username:** admin@admin.com
- **Password:** 123456aA@

## Technologies Used

**Frontend**

- React 19, React Router v7
- Tailwind CSS + @tailwindcss/vite
- Framer Motion, Lottie React
- TanStack React Query
- React Hook Form, React Select, React Datepicker
- Axios, SweetAlert2, React Toastify
- Stripe Elements (@stripe/react-stripe-js, @stripe/stripe-js)
- Recharts, React Icons, Heroicons

**Backend**

- Node.js, Express
- MongoDB, Mongoose
- JSON Web Tokens (JWT)
- Cloudinary (file uploads)
- Multer, multer-storage-cloudinary, streamifier
- Stripe SDK
- CORS, dotenv

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arafat22184/assignment-12-client.git
   cd assignment-12-client
   ```
2. **Setup Environment Variables**  
   Create a `.env.local` file in `root` directories with the following:

   ```bash
   # Client .env.local
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   ```

3. **Install dependencies**

   ```bash
   # Frontend
   npm install
   ```

4. **Run the application**

   ```bash
   # Frontend (Vite)
   npm run dev
   ```

## Features

- **Role-Based Authentication & Authorization**: JWT-based login for Admin, Trainer, and Member roles.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Secure Routes**: Private/protected routes with 401/403 error handling.
- **Class Booking**: Members can view trainer schedules, book classes, and choose membership packages.
- **Payment Integration**: Stripe checkout with real-time status and booking count updates.
- **Trainer Application Workflow**: Apply as trainer; Admin can approve/reject with feedback.
- **Dynamic Dashboards**: Role-specific dashboards for Admins (user management, financial overview), Trainers (slot management), Members (activity log).
- **Community Forums**: Public forum with pagination, up/down voting, and badges for Admin/Trainer posts.
- **Testimonials & Reviews**: Carousel slider of member reviews; reviews submitted via dashboard.
- **Newsletter Subscription**: Public subscription form saving to database without login.

## Project Structure

```
fitforge/
├── client/           # React front-end (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── Firebase/
│   │   ├── Hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── Provider/
│   │   ├── router/
│   │   ├── routes/
│   │   ├── Shared/
│   │   ├── utils/
│   │   ├── index.css/
│   │   ├── main.jsx/
│   └── vite.config.js
└── README.md
```

## Environment Variables

Store sensitive keys in `.env.local` (client root):

- `VITE_FIREBASE_*`
- `MONGODB_URI`, `JWT_SECRET`
- `CLOUDINARY_*`, `STRIPE_SECRET_KEY`

## Available Scripts

**Client**

- `npm run dev` — start Vite development server
- `npm run build` — build production bundle

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
