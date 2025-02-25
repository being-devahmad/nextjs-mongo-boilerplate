# Next.js 15 Boilerplate with MongoDB and Role-Based Authentication

## 🚀 Project Overview

This is a boilerplate project set up using Next.js 15 with MongoDB as the database. It includes role-based authentication with Admin and User roles, along with complete middleware for access control. The project also integrates ESLint and Prettier for code consistency and quality.

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) - React-based framework for building web applications
- [MongoDB](https://www.mongodb.com/) - NoSQL database for data storage
- [Mongoose](https://mongoosejs.com/) - ODM for MongoDB
- [NextAuth.js](https://next-auth.js.org/) - Authentication provider
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Code linting and formatting

## 🔑 Features

- User authentication (sign-up, login, logout)
- Role-based access control (Admin & User)
- Secure API routes with middleware
- MongoDB database integration
- ESLint and Prettier configured for clean code

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

## 🔐 Authentication & Middleware

### Role-Based Access

The project includes middleware to protect routes based on user roles.

- **Admin Routes**: Accessible only to users with the Admin role.
- **User Routes**: Accessible to all authenticated users.

Middleware is implemented in `middleware.ts` and checked in API routes before execution.

## 🏛️ Folder Structure

```
📦 project-root
├── 📂 .next
├── 📂 node_modules
├── 📂 public
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 (admin)
│   │   │   ├── 📂 dashboard
│   │   │   └── 📂 settings
│   │   ├── 📂 (auth)
│   │   │       └──  📂 auth
│   │   │   │   │   │   ├── 📂 profile
│   │   │   │   │   │   └── 📂 settings
│   │   ├── 📂 (user)
│   │   │   ├── 📂 profile
│   │   │   └── 📂 settings
│   │   ├── 📂 api
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── 📂 components
│   └── 📂 lib
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
└── next.config.ts
```

## ✅ Linting & Formatting

Run the following command to check linting and formatting issues:

```bash
npm run lint
```

To automatically fix formatting:

```bash
npm run format
```

## 📜 License

This project is licensed under the MIT License.

## 🎯 Contributing

Feel free to fork this repository and submit a pull request with improvements or new features!

## 💡 Happy coding! 🚀
