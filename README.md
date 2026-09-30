# Leave Management System

A full-stack Leave Management System designed to simplify and streamline employee leave management. Employees can securely log in, apply for leave, track their leave history, and monitor their available leave balance, while administrators can review, approve, or reject leave requests through a dedicated admin dashboard.

## Live Application

- **URL:** https://leave-management-system-git-main-leave-management4.vercel.app

## Features

### Employee

- Employee login
- View leave balance
- Apply for leave
- View leave history
- Track leave request status

### Admin

- Admin login
- View all leave requests
- Approve leave requests
- Reject leave requests
- Track employee leave usage

### Security

- JWT-based authentication
- Role-based access control
- Protected frontend routes
- BCrypt password hashing

## Architecture

<p align="center">
  <img width="400" alt="Leave Management System" src="https://github.com/user-attachments/assets/c73cbfa5-0f1a-4b84-a7fe-bb503f5a395c" />
</p>

## Tech Stack

### Frontend
- React
- JavaScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Lombok
- JWT
- Maven
- Flyway

### Database
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

## Project Structure

<p align="center">
<img width="400" alt="image" src="https://github.com/user-attachments/assets/fc2fb855-c0f5-4630-856b-949522d6b656" />
</p>

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate user and return JWT |

### Employee

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/leaves` | Apply for leave |
| GET | `/api/leaves//my-leaves` | Get employee leave history |
| GET | `/api/leaves/balance` | Get employee leave balance |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/leaves` | Get all leave requests |
| PATCH | `/api/admin/leaves/{id}/approve` | Approve a leave request |
| PATCH | `/api/admin/leaves/{id}/reject` | Reject a leave request |

## Prerequisites

- Java 17
- Maven
- Node.js
- PostgreSQL

## Local Setup

### Backend

```bash
cd server/leave-management-system
./mvnw spring-boot:run
```

### Frontend

```bash
cd client
npm install
npm run dev
```
