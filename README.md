# **API Documentation**
https://documenter.getpostman.com/view/37880571/2sAYQanC5C#707f2642-276e-4868-b838-1d73eb20d481


# **Event Management System**

The Event Management System is a RESTful API that allows users to manage events, register for events, and perform analytics. This project supports role-based access control for users, event organizers, and administrators.

---

## **Features**

- **Authentication**: User registration and login using JWT-based authentication.
- **User Management**: Role-based operations for users and administrators.
- **Event Management**: Create, update, delete, and view events.
- **Event Registration**: Register for events and cancel registrations.
- **Admin**: Get all events, Users, and  delete a user (soft delete).
- **Analytics**: View popular events, most active users and event statistics (admin only).
- **Notifications**: Notify attendees about event updates (organizers, and admin).

---

## **Technologies Used**

- **Backend**: Node.js/Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js installed
- MongoDB installed
- Postman (optional, for API testing)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Configure Environment Variables**
Create a `.env` file in the project root and add the following environment variables:

```bash
PORT=5000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret-key>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-app-password>`
```

### **5. Run the Server**

```bash
npm run dev
```
The server will run on `http://localhost:5000`.

---

## **Testing the API**

1. **Using Postman**:
   - Import the endpoints into Postman. from the folder (Postman API collections)
   - Use the provided `JWT_ACCESS_TOKEN` for endpoints that require authentication.
   
2. **Using Curl**:
   Example for registering a user:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"name":"new user","email":"newuser@gmail.com","password":"12345678"}'
   ```

---