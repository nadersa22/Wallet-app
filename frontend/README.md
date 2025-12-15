# 💰 Digital Wallet Application

A full-stack web application that allows users to manage digital money through a simple, secure wallet system. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node.js-18+-green)

---

## 🌟 Features

### ✅ Completed
- 🔐 **User Authentication** - Secure signup and login with JWT
- 💵 **Starting Balance** - New users receive $1000 automatically
- 🔒 **Password Security** - Bcrypt password hashing
- 🎨 **Modern UI** - Responsive design with TailwindCSS
- 🛡️ **Protected Routes** - Authentication-required pages
- 📱 **Mobile Responsive** - Works on all devices

### 🔄 In Progress
- 💸 **Money Transfer** - Send money to other users
- 📊 **Transaction History** - View all transactions
- 💰 **Deposit/Withdraw** - Add or remove money
- 📈 **Dashboard Statistics** - Financial overview
- 🔍 **Transaction Filters** - Filter by type, date, amount

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         REACT FRONTEND (PORT 5173)      │
│  • Login/Signup Pages                   │
│  • Dashboard with Balance               │
│  • Transaction Management               │
│  • Money Transfer Interface             │
└────────────────┬────────────────────────┘
                 │ REST API (HTTP/JSON)
┌────────────────▼────────────────────────┐
│      EXPRESS BACKEND (PORT 5000)        │
│  • JWT Authentication                   │
│  • Wallet Management                    │
│  • Transaction Processing               │
│  • Input Validation                     │
└────────────────┬────────────────────────┘
                 │ Mongoose ODM
┌────────────────▼────────────────────────┐
│         MONGODB ATLAS DATABASE          │
│  • Users Collection                     │
│  • Wallets Collection                   │
│  • Transactions Collection              │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js v5
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **Validation:** express-validator
- **Security:** CORS, cookie-parser
- **Dev Tools:** nodemon, morgan

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Styling:** TailwindCSS
- **State Management:** Context API
- **Icons:** Lucide React

---

## 📁 Project Structure

```
wallet-app/
│
├── backend/                    # Server-side application
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js    # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js        # User schema
│   │   │   ├── Wallet.js      # Wallet schema
│   │   │   └── Transaction.js # Transaction schema
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── routes/
│   │   │   └── auth.js
│   │   ├── middlewares/
│   │   │   ├── auth.js        # JWT verification
│   │   │   └── validation.js  # Input validation
│   │   ├── utils/
│   │   │   ├── auth.js        # Auth helpers
│   │   │   └── constants.js   # App constants
│   │   └── app.js             # Express config
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/                  # Client-side application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Common/       # Reusable components
│   │   │   └── Layout/       # Layout components
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Transactions.jsx
│   │   │   └── Transfer.jsx
│   │   ├── services/
│   │   │   ├── api.js        # Axios instance
│   │   │   └── authService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier available)
- **Git** for version control

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nadersa22/wallet-app.git
cd wallet-app
```

#### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**Get MongoDB Connection String:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster (free tier)
3. Go to **Database Access** → Create a user
4. Go to **Network Access** → Add IP (0.0.0.0/0 for development)
5. Click **Connect** → **Connect your application** → Copy connection string
6. Replace `<password>` with your database user password

Start the backend:
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
🚀 Server is running on port 5000
```

#### 3️⃣ Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🧪 Testing the API

### Using Postman or Thunder Client

#### 1. Health Check
```http
GET http://localhost:5000/health
```

#### 2. User Signup
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "test123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "wallet": {
      "balance": 1000,
      "currency": "USD"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. User Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "test123"
}
```

#### 4. Get Current User (Protected Route)
```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| GET | `/api/auth/logout` | Logout user | ✅ |

### Request/Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (2-50 chars),
  email: String (unique, validated),
  password: String (hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Wallet Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, unique),
  balance: Number (default: 1000, min: 0),
  currency: String (default: 'USD'),
  isActive: Boolean (default: true),
  lastTransaction: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Collection
```javascript
{
  _id: ObjectId,
  wallet: ObjectId (ref: Wallet),
  user: ObjectId (ref: User),
  type: String (enum: ['deposit', 'withdrawal', 'transfer_in', 'transfer_out']),
  amount: Number (min: 0.01),
  description: String (max: 200 chars),
  relatedUser: ObjectId (ref: User),
  balanceAfter: Number,
  status: String (enum: ['pending', 'completed', 'failed']),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **HTTP-only Cookies** - XSS protection
- ✅ **Input Validation** - express-validator middleware
- ✅ **CORS Configuration** - Restricted origins
- ✅ **Protected Routes** - Authentication middleware
- ✅ **Error Handling** - Secure error messages

---

## 🎨 UI Pages

### Login Page
- Email and password inputs
- Form validation
- Error messages
- Link to signup

### Signup Page
- Name, email, password inputs
- Validation feedback
- Automatic wallet creation
- $1000 starting balance

### Dashboard
- Current balance display
- Quick actions (deposit, withdraw, transfer)
- Recent transactions
- Summary statistics

### Transaction History
- Complete transaction list
- Filters (type, date, amount)
- Pagination
- Transaction details

### Transfer Money
- Recipient email input
- Amount input
- Description field
- Confirmation dialog

---

## 🚧 Development Roadmap

### Phase 1: Core Features ✅
- [x] User authentication
- [x] MongoDB integration
- [x] JWT tokens
- [x] Password hashing
- [x] Basic routing

### Phase 2: Wallet Features 🔄
- [ ] Deposit money
- [ ] Withdraw money
- [ ] Transfer to other users
- [ ] Transaction history
- [ ] Balance validation

### Phase 3: UI/UX Enhancement 📝
- [ ] Loading states
- [ ] Success/Error notifications
- [ ] Responsive design
- [ ] Form validation feedback
- [ ] Transaction receipts

### Phase 4: Advanced Features 🎯
- [ ] Email notifications
- [ ] Transaction categories
- [ ] Export to CSV
- [ ] Search functionality
- [ ] User profiles

### Phase 5: Deployment 🚀
- [ ] Backend to Render/Railway
- [ ] Frontend to Vercel/Netlify
- [ ] Production environment variables
- [ ] Custom domain
- [ ] SSL certificates

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB URI is correct
# Verify .env file exists
# Check Node.js version: node --version
# Reinstall dependencies: rm -rf node_modules && npm install
```

### Frontend can't connect to backend
```bash
# Verify backend is running on port 5000
# Check CORS settings in app.js
# Verify API baseURL in frontend/src/services/api.js
```

### MongoDB connection failed
```bash
# Check MongoDB Atlas IP whitelist (0.0.0.0/0)
# Verify database user credentials
# Check connection string format
# Test connection at mongodb.com
```

### JWT token invalid
```bash
# Check JWT_SECRET in .env
# Verify token format: "Bearer <token>"
# Check token expiration (7 days default)
```

---

## 📝 Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm test        # Run tests (not implemented yet)
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nader Serhal**
- GitHub: [@nadersa22](https://github.com/nadersa22)
- Email: naderserhal18@gmail.com
- Portfolio: [Your Task Management System](https://github.com/nadersa22/advanced-task-management-system)

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- JWT Authentication Guide
- REST API Best Practices

---

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/nadersa22/wallet-app/issues) page
2. Read the documentation above
3. Contact: naderserhal18@gmail.com

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn full-stack development!

---

**Built with ❤️ by Nader Serhal | December 2025**