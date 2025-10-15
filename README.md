Perfect! Since your project is now quite feature-rich, we can write a **professional, detailed README** that covers everything — purpose, setup, usage, authentication, validation, and technologies. I’ll give a structured and polished version.

Here’s a full draft for your `README.md`:

---

# To-Do List API

A **RESTful API** built with Node.js and Express.js for managing a personal to-do list, integrated with **MongoDB** for storage, **authentication** for secure operations, and **input validation** using **express-validator**.

This project was built as part of a backend development learning journey, gradually covering core concepts like REST APIs, database operations, authentication, and data validation.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Authentication](#authentication)
6. [API Endpoints](#api-endpoints)
7. [Data Validation](#data-validation)
8. [Error Handling](#error-handling)
9. [Project Structure](#project-structure)
10. [Future Improvements](#future-improvements)

---

## Project Overview

The To-Do List API allows users to create, read, update, and delete tasks. It was developed to help understand the fundamentals of backend development, RESTful API design, and database interactions.

The project includes:

- **User authentication** (JWT-based)
- **Role-based access** for creating, updating, and deleting tasks
- **Data validation** to ensure request integrity
- **Clean error handling**

---

## Features

- **User Authentication**

  - Sign up and login
  - JWT token generation

- **Task Management**

  - Create a new task (authenticated users only)
  - View all tasks (anyone)
  - View a single task by ID (anyone)
  - Update a task (authenticated users only, only if owner)
  - Delete a task (authenticated users only, only if owner)

- **Validation**

  - Input fields are validated using **express-validator**
  - Example: Task priority can only be `low`, `medium`, or `high`

- **Error Handling**

  - Centralized error handler for clean API responses

---

## Technologies Used

- **Node.js** – JavaScript runtime for building the backend
- **Express.js** – Web framework for routing and middleware
- **MongoDB** – Database for storing users and tasks
- **Mongoose** – ODM for MongoDB
- **bcryptjs** – Password hashing
- **jsonwebtoken (JWT)** – Token-based authentication
- **express-validator** – Input validation for API requests
- **CORS** – Cross-Origin Resource Sharing

---

## Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/MuhammadFuzail591/Todo-List-API-ExpressJS--JWT--Express-Validator

cd Todo
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** in a `.env` file:

```env
PORT=3000
MONGO_URI=<your-mongo-connection-string>
SECRET_KEY=<your-jwt-secret-key>
```

4. **Run the server**

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

---

## Authentication

- Users can **sign up** and **login** using their email and password.
- Passwords are **hashed** using `bcryptjs` for security.
- **JWT tokens** are issued upon successful login and must be sent in the `Authorization` header as `Bearer <token>` for protected routes (create, update, delete tasks).
- Unauthorized users can **read tasks**, but cannot create, update, or delete.

---

## API Endpoints

### Users

| Method | Endpoint            | Description                 | Auth Required |
| ------ | ------------------- | --------------------------- | ------------- |
| POST   | `/api/users/create` | Register a new user         | No            |
| POST   | `/api/users/login`  | Login and receive JWT token | No            |
| GET    | `/api/users/`       | Get all users               | No            |

### Tasks

| Method | Endpoint                            | Description       | Auth Required |
| ------ | ----------------------------------- | ----------------- | ------------- |
| POST   | `/api/tasks/create/:userId`         | Create a task     | Yes           |
| GET    | `/api/tasks/get_all`                | Get all tasks     | No            |
| GET    | `/api/tasks/get_one/:taskId`        | Get a single task | No            |
| PATCH  | `/api/tasks/update/:taskId/:userId` | Update a task     | Yes           |
| GET    | `/api/tasks/del/:taskId/:userId`    | Delete a task     | Yes           |

> **Note:** Only the user who owns a task can update or delete it.

---

## Data Validation

- Validation is done using **express-validator**.
- Example rules:

  - `name` and `content` must not be empty
  - `priority` must be one of `low`, `medium`, `high`
  - `date` must be a valid ISO date

- Invalid requests return **HTTP 400** with a JSON describing the errors.

---

## Error Handling

- All errors are centrally handled in `server.js`
- Example error response:

```json
{
  "message": "Invalid Credentials"
}
```

- Validation errors return an array of error objects:

```json
{
  "errors": [
    { "field": "email", "message": "Email is required" },
    { "field": "password", "message": "Password must be at least 6 characters" }
  ]
}
```

---

## Project Structure

```
project/
src/
├── config/
│   └── db.js
├── middleware/
│   ├── auth.js
│   └── validate.js
├── task/
│   ├── task.model.js
│   ├── task.route.js
│   └── task.validator.js
├── user/
│   ├── user.model.js
│   ├── user.route.js
│   └── user.validator.js
├── server.js          # App entry point
├── package.json
├── .env
└── README.md
```

---

## Future Improvements

- Implement **role-based access** (admin, normal user)
- Add **pagination** for task listing
- Add **search and filter** by priority or date
- Add **unit and integration tests**
- Improve **API documentation** using Swagger

---

## Author

**Muhammad Fuzail** – Backend Development Learner

- GitHub: [your-github-link]
- LinkedIn: [your-linkedin-link]

---