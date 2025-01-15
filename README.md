# Event Management API

## Overview
This project is a **Comprehensive Event Management API** built using **Node.js**, **Express.js**, and **MongoDB**. It includes features such as user authentication, event creation, registration, attendance tracking, analytics, and admin tools.

---

## Features
- **User Authentication & Management**
  - User registration, login, and role-based access control (Admin, Organizer, User).
- **Event Management**
  - Event creation, updating, and deletion.
  - Attendee registration and cancellation.
- **Analytics**
  - Top 5 most registered events.
  - Top 5 most active users.
- **Notifications**
  - Send notifications to attendees via email.
- **Admin Tools**
  - Retrieve and manage users and events.

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest
---

## Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (Optional, for containerized deployment)

### 2. Clone Repository
```bash
git clone https://github.com/yourusername/event-management-api.git
cd event-management-api
