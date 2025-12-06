# POS Master: Modern Point-of-Sale & Order Management System

A full-stack restaurant POS system built to handle orders, tables, payments and invoice printing exclusively managed by the owner. This project utilizes a modular monolithic architecture with production-grade practices, ensuring scalability and maintainability.

## Live Demonstration

**Live Deployment:** [Insert Render Link Here]



## Key Features

**Authentication & Security**
* Secure login system using JSON Web Tokens (JWT).
* Encrypted passwords with bcrypt.
* Implementation of protected routes to restrict unauthorized access.

**Table Management**
* Capabilities to create and manage restaurant tables.
* Functionality to track table availability and assignments.*
**Order Handling**
* Create and manage customer orders efficiently.
* Real-time updates for order status.
* Built on structured REST APIs.

**Payments**
* Integrated Razorpay payment gateway.
* Automated order confirmation generated after successful *ayments.

**Scalable Architecture**
* Clean and modular project structure.
* Clear separation of concerns between frontend and backend.
* API-driven design philosophy.


## POS Master — Workflow

    <img src="https://github.com/DigitalTrailblazer/POS-Master/blob/main/client/public/workFlow.png" alt="preview of workflow"/>


## Technical Stack

**Frontend**
* React.js
* Tailwind CSS
* Redux Toolkit (Global State Management)
* React Query (Server State & Caching)

**Backend**
* Node.js
* Express.js
* JWT (Authentication & Authorization)
* Bcrypt.js (Security)

**Database**
* MongoDB Atlas (Cloud Hosted)

**External Services**
* Razorpay (Payment Gateway)


## Project Architecture

```text
POS-MASTER/
│
├── client/                 
│   ├── public/
│   ├── src/
│   │   ├── assets/          
│   │   ├── components/    
│   │   ├── hooks/          
│   │   ├── https/          
│   │   ├── pages/           
│   │   ├── redux/           
│   │   ├── utils/           
│   │   ├── App.jsx          
│   │   └── main.jsx        
│   ├── .env                 
│   ├── eslint.config.js    
│   └── vite.config.js     
│
├── server/            
│   ├── config/             
│   ├── controllers/    
│   ├── middlewares/    
│   ├── models/        
│   ├── routes/             
│   ├── services/    
│   ├── app.js              
│   └── .env               
│
└── README.md

```


# Installation Guide

### Clone the repository

```bash
git clone https://github.com/DigitalTrailblazer/POS-Master
```

### Backend Setup

```bash
cd server
npm install
```
Create a `.env` file:

```
PORT=5000

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd ../client
npm install
```
Create a .env file in the client directory

```
VITE_BACKEND_URL = http://localhost:1111

VITE_RAZORPAY_KEY_ID = razorpay_key_id
VITE_RAZORPAY_KEY_SECRET = razorpay_key_secret
```

Run the React app:

```bash
npm run dev
```

Now open [http://localhost:5173](http://localhost:5173)
Backend runs on [http://localhost:1111](http://localhost:1111)

---


## API Endpoints (Summary)

### **Auth Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login existing user | Public |
| **POST** | `/api/auth/logout` | Logout user |  Protected |
| **GET** | `/api/auth/` | Get current user profile |  Protected |

### **Order Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/orders` | Create a new order |  Protected |
| **GET** | `/api/orders` | Fetch all orders |  Protected |
| **GET** | `/api/orders/:id` | Get specific order details |  Protected |
| **PUT** | `/api/orders/:id` | Update order status |  Protected |

### **Table Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/tables` | Add a new table |  Protected |
| **GET** | `/api/tables` | Fetch all tables |  Protected |
| **PUT** | `/api/tables/:id` | Update table details |  Protected |

### **Payment Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/payment/create-order` | Initialize Razorpay order | Protected |
| **POST** | `/api/payment/verify-payment` | Verify payment signature | Protected |



## Testing

* Tested with **Postman** for all CRUD APIs.
* Handles invalid input gracefully with appropriate status codes and messages.


## Contributing

Contributions are always welcome!
Fork the repo, make changes, and open a PR.


## Author

**Piyush Shrivastava**
* Full Stack Developer
* [Portfolio](yourportfolio.com)
* [Linkedin](https://www.linkedin.com/in/piyush-shrivastava-%F0%9F%87%AE%F0%9F%87%B3-58351825b/)


## License

This project is licensed under the **MIT License** — feel free to use and modify it.


