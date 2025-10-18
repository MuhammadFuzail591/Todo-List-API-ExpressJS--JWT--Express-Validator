# 🧩 To-Do List API

A **RESTful API** built with Node.js and Express.js for managing a personal to-do list, integrated with **MongoDB** for storage, **authentication** for secure operations, **input validation** using **express-validator**, and **pagination** for efficient data retrieval.

This project was built as part of a backend development learning journey — gradually covering core concepts like REST APIs, database operations, authentication, validation, and pagination.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Authentication](#authentication)
6. [API Endpoints](#api-endpoints)
7. [Data Validation](#data-validation)
8. [Pagination](#pagination)
9. [Error Handling](#error-handling)
10. [Project Structure](#project-structure)
11. [Future Improvements](#future-improvements)
12. [Acknowledgment](#acknowledgment)

---

## 🧭 Project Overview

The To-Do List API allows users to create, read, update, and delete tasks. It was developed to strengthen understanding of backend principles, RESTful API design, and database interactions.

The project includes:

* **User authentication** (JWT-based)
* **Protected routes** for create/update/delete
* **Data validation** using express-validator
* **Pagination** for efficient task retrieval
* **Centralized error handling**

---

## ⚙️ Features

### 🔐 User Authentication

* Sign up and login
* JWT token generation and verification

### 🧱 Task Management

* Create, read, update, delete tasks
* Only authenticated users can modify their own tasks
* Public access for reading tasks

### ✅ Validation

* Input validation using **express-validator**
* Example:

  * `priority` must be one of `low`, `medium`, or `high`
  * `date` must be a valid ISO date

### 📄 Pagination

* Tasks can be fetched with `page` and `limit` query parameters
* Example:

  ```
  /api/tasks/get_all?page=2&limit=5
  ```
* Optimized for performance and scalability

### ⚠️ Error Handling

* Centralized middleware returns clean, structured error responses

---

## 💻 Technologies Used

| Purpose          | Technology           |
| ---------------- | -------------------- |
| Server Framework | Express.js           |
| Language         | Node.js (ES Modules) |
| Database         | MongoDB              |
| ODM              | Mongoose             |
| Authentication   | JWT + bcryptjs       |
| Validation       | express-validator    |
| CORS             | cors                 |

---

## ⚙️ Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MuhammadFuzail591/Todo-List-API-ExpressJS--JWT--Express-Validator
   cd Todo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```env
   PORT=3000
   MONGO_URI=<your-mongo-connection-string>
   SECRET_KEY=<your-jwt-secret-key>
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

Server runs on:
`http://localhost:3000`

---

## 🔑 Authentication

* Users register and log in with email and password
* Passwords are hashed using **bcryptjs**
* JWT tokens must be passed in `Authorization: Bearer <token>` header for protected routes
* Unauthenticated users can only view tasks

---

## 📡 API Endpoints

### 👤 User Routes

| Method | Endpoint            | Description             | Auth Required |
| ------ | ------------------- | ----------------------- | ------------- |
| POST   | `/api/users/create` | Register a new user     | ❌             |
| POST   | `/api/users/login`  | Login and receive token | ❌             |
| GET    | `/api/users/`       | Get all users           | ❌             |

### ✅ Task Routes

| Method | Endpoint                            | Description         | Auth Required |
| ------ | ----------------------------------- | ------------------- | ------------- |
| POST   | `/api/tasks/create/:userId`         | Create a new task   | ✅             |
| GET    | `/api/tasks/get_all?page=&limit=`   | Get paginated tasks | ❌             |
| GET    | `/api/tasks/get_one/:taskId`        | Get a single task   | ❌             |
| PATCH  | `/api/tasks/update/:taskId/:userId` | Update a task       | ✅             |
| GET    | `/api/tasks/del/:taskId/:userId`    | Delete a task       | ✅             |

> **Note:** Only the owner of a task can update or delete it.

---

## 🧾 Data Validation

* All input data is validated using **express-validator**
* Example:

  ```js
  body('priority').isIn(['low', 'medium', 'high'])
  ```
* Validation errors return:

  ```json
  {
    "errors": [
      { "msg": "priority must be one of: low, medium, high" }
    ]
  }
  ```

---

## 📊 Pagination

Pagination implemented using query parameters:

* `page`: Page number (default 1)
* `limit`: Number of results per page (default 5)

Example request:

```
GET /api/tasks/get_all?page=2&limit=5
```

This improves performance by returning only relevant chunks of data instead of the entire dataset.

---

## ⚠️ Error Handling

* All validation and runtime errors are handled gracefully
* Standardized error structure:

  ```json
  {
    "message": "Invalid Credentials"
  }
  ```
* Validation errors return detailed messages with fields

---

## 📂 Project Structure

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
└── server.js
```

---

## 🚀 Future Improvements

* Separate logic into controller files
* Add filtering and sorting with pagination
* Implement role-based access (admin/user)
* Add Swagger API documentation
* Write unit/integration tests

---

## 🙌 Acknowledgment

Special thanks to [Hammad](https://www.linkedin.com/in/muhammad-hammad-shah-9a480b270/), who has been guiding me throughout this journey.
Each step — from understanding the basics to implementing real backend features — became clearer with his mentorship.

To this extent, backend development now feels relatable and powerful.
I’ve started to truly feel the **strength of strong fundamentals**.
Every engineer emphasizes fundamentals — and that’s absolutely true.
Alhamdulillah, the comfort and clarity I have today are purely by the grace of **Allah**, who gave me the power to take action.
He has power over everything.

## Author **Muhammad Fuzail** – Backend Development Learner 
- LinkedIn: [Muhammad Fuzail](https://www.linkedin.com/in/muhammad-fuzail-a554082b4/)
