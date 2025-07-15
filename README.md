> ⚠️ **Warning**  
> This repository contains shell script:  and `int_db.sh`.  
> Please review their contents before executing, as they can modify your system environment or database.


# Booking API

A RESTful API for managing users, services, bookings, and availability using Node.js, Express, TypeScript, PostgreSQL, Redis, JWT authentication, and Swagger documentation.

---

## 📦 Tech Stack

* **Backend:** Node.js, Express.js, TypeScript
* **DB:** PostgreSQL (via Sequelize)
* **Cache:** Redis
* **Auth:** JWT (access + refresh tokens via HTTP-only cookies)
* **Validation:** class-validator
* **Docs:** Swagger (swagger-jsdoc + swagger-ui-express)
* **Rate Limiting:** Custom middleware using express-rate-limit
* **DevOps:** Docker Compose

---

## 📂 Project Structure

```
src/
│
├── modules/
│   ├── auth/
│   ├── services/
│   ├── booking/
│   ├── availability/
│   ├── redis/
│   └── postgres/
│
├── middlewares/
├── core/
├── config/
├── shared/
├── error/
└── router.ts
```

---

## Project setup

```bash
git clone https://github.com/your-username/booking-api.git
cd booking-api
```

### Set configuration variables
First you need copy all from example.env to .env

```bash
$ cp example.env .env
```


Start docker
```bash
$ docker compose up
```


### API
```url
http://localhost:5010/api/docs/
```

### Users
- Client
  - username: client@gmail.com
  - password: client1
- Provider
  - username: provider@gmail.com
  - password: provider

---
### 1. Clone the project


> PostgreSQL and Redis will be automatically started.

---

## 📘 Swagger API Docs

Docs are available at:

```
http://localhost:3000/api/docs
```

---

## 💡 Example API Requests

### 🔐 Auth

```http
POST /api/auth/sign-up
Content-Type: application/json

{
  "email": "client1@gmail.com",
  "password": "client1",
  "userType": "client"
}
```

```http
POST /api/auth/sign-in
Content-Type: application/json

{
  "email": "client1@mail.com",
  "password": "client1"
}
```
---

## 🧠 Architecture Overview

* **Express App** is initialized in `app.ts` and configured with:

  * JSON parsing
  * URL encoding
  * Global rate limiter middleware
  * Swagger documentation
  * Global error handler

* **Controllers** extend a common `Controller` abstract and define routes in `initRoutes()`.

* **Booking availability** is calculated per provider with caching for performance.

* **JWT Tokens** (access + refresh) are issued on sign-in/sign-up and stored in cookies.