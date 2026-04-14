# Day 3: Authentication (JWT)

Hello developers! Welcome to Day 3 of our SmartTask AI project!

Yesterday we built CRUD APIs for users. But there's a BIG problem - anyone can create, read, update, or delete users without any security! Today we fix that by adding **Authentication**.

---

## What We Will Build Today

- **Register API** - Users can sign up with hashed passwords
- **Login API** - Users get a JWT token after successful login
- **Password hashing** with bcrypt
- **JWT token** generation and verification

---

## Why Is This Important?

> Imagine your house has no lock on the door. Anyone can walk in, take your stuff, or mess things up. **Authentication is the lock on your API's door.**

Without authentication:
- Anyone can access your data
- No way to know WHO is making requests
- No way to restrict actions (admin vs user)

---

## Concept Explanation

### What is Password Hashing?

Hashing = Converting a password into a **scrambled, unreadable string**.

```
Original:  "password123"
Hashed:    "$2b$10$X4kv7fLgGc8y9YEz.e6F9eN5KxJdW3J0v2xUEv8k6.5H1D9Gq.Sq"
```

**Why not just store the original password?**

If a hacker steals your database:
- Plain text: They see `password123` → Your account is hacked!
- Hashed: They see `$2b$10$X4kv...` → Useless! Can't reverse it.

**Analogy:** Hashing is like a **meat grinder**. You can turn meat into ground meat, but you can't turn ground meat back into a steak!

### What is JWT (JSON Web Token)?

JWT is like a **digital ID card** that proves who you are.

```
When you login at a hotel:
1. You show your passport (email + password)
2. Hotel gives you a room key card (JWT token)
3. You use the key card to access your room (protected APIs)
4. Key card expires after checkout (token expiration)
```

A JWT token has 3 parts:
```
xxxxx.yyyyy.zzzzz
  │      │      │
  │      │      └── Signature (verification)
  │      └── Payload (user data like id, email, role)
  └── Header (algorithm info)
```

### How Authentication Works

```
1. User registers → Password is hashed → Saved to database
2. User logs in → Password compared with hash → JWT token returned
3. User makes requests → Sends JWT token → Server verifies → Access granted
```

**Quick Question:** Why do we use JWT instead of just storing "logged in" status in the server?

**Answer:** JWT is **stateless** - the server doesn't need to remember who's logged in. The token itself contains all the info. This makes it easy to scale to multiple servers!

---

## Folder Structure (Updated)

```
SmartTaskAI/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── auth.controller.ts    ← NEW
│   ├── entities/
│   │   └── User.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts     ← NEW
│   ├── routes/
│   │   ├── user.routes.ts
│   │   └── auth.routes.ts        ← NEW
│   ├── services/
│   │   ├── user.service.ts
│   │   └── auth.service.ts       ← NEW
│   ├── utils/
│   │   └── jwt.utils.ts          ← NEW
│   ├── models/
│   └── index.ts
├── .env
├── tsconfig.json
└── package.json
```

---

## Step-by-Step Coding

### Step 1: Create JWT Utility

Create `src/utils/jwt.utils.ts`:

```typescript
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Secret key for signing tokens - keep this SECRET!
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Interface for what we store in the token
// This is the "payload" - the data inside the ID card
interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

// Generate a JWT token
// Like creating a new ID card for a user
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

// Verify a JWT token
// Like checking if an ID card is real and not expired
export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
```

### Step 2: Create Auth Service

Create `src/services/auth.service.ts`:

```typescript
import bcrypt from "bcryptjs";
import AppDataSource from "../config/database";
import { User } from "../entities/User";
import { generateToken } from "../utils/jwt.utils";

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  // REGISTER: Create a new user with hashed password
  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    // Step 1: Check if email already exists
    const existingUser = await userRepository.findOneBy({
      email: data.email,
    });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Step 2: Hash the password
    // The number 10 is the "salt rounds" - how many times to scramble
    // Higher = more secure but slower. 10 is a good balance.
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Step 3: Create user with hashed password
    const user = userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    // Step 4: Save to database
    const savedUser = await userRepository.save(user);

    // Step 5: Generate JWT token for auto-login after registration
    const token = generateToken({
      userId: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    });

    // Step 6: Return user data (without password) and token
    const { password, ...userWithoutPassword } = savedUser;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  // LOGIN: Verify credentials and return token
  async login(data: { email: string; password: string }) {
    // Step 1: Find user by email
    const user = await userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Step 2: Compare password with hashed password
    // bcrypt.compare does the magic:
    // It hashes the input password and compares with stored hash
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      // Note: We say "Invalid email or password" not "Invalid password"
      // This prevents hackers from knowing if an email exists
      throw new Error("Invalid email or password");
    }

    // Step 3: Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Step 4: Return user data (without password) and token
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }
}
```

### Step 3: Create Auth Controller

Create `src/controllers/auth.controller.ts`:

```typescript
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  // POST /api/auth/register
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Name, email, and password are required",
        });
        return;
      }

      // Validate email format (basic check)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
        return;
      }

      // Validate password length
      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
        return;
      }

      const result = await authService.register({ name, email, password });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error: any) {
      // Handle known errors (like duplicate email)
      if (error.message === "Email already registered") {
        res.status(409).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      const result = await authService.login({ email, password });

      res.json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      // Handle invalid credentials
      if (error.message === "Invalid email or password") {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
```

### Step 4: Create Auth Middleware

Create `src/middlewares/auth.middleware.ts`:

```typescript
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

// Extend Express Request to include user data
// This lets us access user info in controllers after authentication
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        role: string;
      };
    }
  }
}

// Authentication Middleware
// This checks if the user has a valid JWT token
// Think of it as a "security guard" at the door
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Step 1: Get the token from the Authorization header
    // Format: "Bearer eyJhbGciOiJIUzI1NiIs..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
      return;
    }

    // Step 2: Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // Step 3: Verify the token
    const decoded = verifyToken(token);

    // Step 4: Attach user data to the request object
    // Now controllers can access req.user to know who is making the request
    req.user = decoded;

    // Step 5: Continue to the next middleware/controller
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
```

### Step 5: Create Auth Routes

Create `src/routes/auth.routes.ts`:

```typescript
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

// Public routes - no authentication needed
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

export default router;
```

### Step 6: Protect User Routes

Update `src/routes/user.routes.ts`:

```typescript
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

// All user routes are now PROTECTED
// The authenticate middleware runs BEFORE the controller
// If token is invalid, the request is rejected before reaching the controller

router.get("/", authenticate, (req, res) => userController.getAll(req, res));
router.get("/:id", authenticate, (req, res) => userController.getById(req, res));
router.put("/:id", authenticate, (req, res) => userController.update(req, res));
router.delete("/:id", authenticate, (req, res) => userController.delete(req, res));

// Note: We REMOVED the POST route - users are now created via /api/auth/register

export default router;
```

### Step 7: Update index.ts

Update `src/index.ts` to include auth routes:

```typescript
import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppDataSource from "./config/database";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "SmartTask AI API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is healthy!",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
  });
});

// Routes
app.use("/api/auth", authRoutes);     // Public: register, login
app.use("/api/users", userRoutes);     // Protected: requires JWT token

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`==========================================`);
      console.log(`  SmartTask AI Server`);
      console.log(`  Environment: ${process.env.NODE_ENV}`);
      console.log(`  Running on: http://localhost:${PORT}`);
      console.log(`  Database: Connected`);
      console.log(`==========================================`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

export default app;
```

---

## Flow Diagram

### Registration Flow

```mermaid id="day3-flow1"
flowchart TD
    A[User sends POST /api/auth/register] --> B{Valid Input?}
    B -->|No| C[Return 400 Error]
    B -->|Yes| D{Email Exists?}
    D -->|Yes| E[Return 409 Conflict]
    D -->|No| F[Hash Password with bcrypt]
    F --> G[Save User to PostgreSQL]
    G --> H[Generate JWT Token]
    H --> I[Return User + Token - 201]
```

### Login Flow

```mermaid id="day3-flow2"
flowchart TD
    A[User sends POST /api/auth/login] --> B{Valid Input?}
    B -->|No| C[Return 400 Error]
    B -->|Yes| D[Find User by Email]
    D --> E{User Found?}
    E -->|No| F[Return 401 Unauthorized]
    E -->|Yes| G[Compare Password with bcrypt]
    G --> H{Password Match?}
    H -->|No| F
    H -->|Yes| I[Generate JWT Token]
    I --> J[Return User + Token - 200]
```

### Protected Route Flow

```mermaid id="day3-flow3"
flowchart TD
    A[User sends GET /api/users] --> B[Auth Middleware]
    B --> C{Has Bearer Token?}
    C -->|No| D[Return 401 - No Token]
    C -->|Yes| E[Verify JWT Token]
    E --> F{Token Valid?}
    F -->|No| G[Return 401 - Invalid Token]
    F -->|Yes| H[Attach user to req.user]
    H --> I[Continue to Controller]
    I --> J[Return Data - 200]
```

### Complete Auth Architecture

```mermaid id="day3-flow4"
flowchart LR
    subgraph "Public Routes"
        Register[POST /api/auth/register]
        Login[POST /api/auth/login]
    end

    subgraph "Protected Routes"
        Users[GET /api/users]
        UserID[GET /api/users/:id]
        Update[PUT /api/users/:id]
        Delete[DELETE /api/users/:id]
    end

    Register --> AuthService
    Login --> AuthService
    AuthService --> DB[(PostgreSQL)]

    Users --> AuthMiddleware[Auth Middleware]
    UserID --> AuthMiddleware
    Update --> AuthMiddleware
    Delete --> AuthMiddleware
    AuthMiddleware --> UserController
    UserController --> DB
```

---

## Test API (Postman Examples)

### Test 1: Register a New User

```
Method: POST
URL: http://localhost:3000/api/auth/register
Headers: Content-Type: application/json

Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-04-14T10:00:00.000Z",
      "updatedAt": "2026-04-14T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test 2: Login

```
Method: POST
URL: http://localhost:3000/api/auth/login
Headers: Content-Type: application/json

Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test 3: Access Protected Route WITH Token

```
Method: GET
URL: http://localhost:3000/api/users
Headers:
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):** List of users

### Test 4: Access Protected Route WITHOUT Token

```
Method: GET
URL: http://localhost:3000/api/users
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Test 5: Login with Wrong Password

```
Method: POST
URL: http://localhost:3000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### cURL Examples

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Access protected route (replace TOKEN with actual token from login)
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer TOKEN"
```

---

## Common Mistakes

### 1. Storing plain-text passwords
```typescript
// WRONG - NEVER do this!
const user = userRepository.create({
  password: "password123", // Stored as-is!
});

// RIGHT - Always hash first
const hashedPassword = await bcrypt.hash("password123", 10);
const user = userRepository.create({
  password: hashedPassword,
});
```

### 2. Revealing which field is wrong during login
```typescript
// WRONG - Tells hackers the email exists!
if (!user) throw new Error("Email not found");
if (!passwordValid) throw new Error("Wrong password");

// RIGHT - Generic message for both cases
if (!user) throw new Error("Invalid email or password");
if (!passwordValid) throw new Error("Invalid email or password");
```

### 3. Not setting token expiration
```typescript
// WRONG - Token never expires (security risk!)
const token = jwt.sign(payload, secret);

// RIGHT - Token expires in 7 days
const token = jwt.sign(payload, secret, { expiresIn: "7d" });
```

### 4. Sending token in URL
```
// WRONG - Token visible in browser history and logs
GET /api/users?token=eyJhbGci...

// RIGHT - Token in Authorization header
Authorization: Bearer eyJhbGci...
```

### 5. Using weak JWT secret
```env
# WRONG
JWT_SECRET=secret
JWT_SECRET=12345

# RIGHT - Use a long, random string
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

---

## Recap

Today we accomplished:

- [x] Added password hashing with bcrypt (10 salt rounds)
- [x] Created Register API (POST /api/auth/register)
- [x] Created Login API (POST /api/auth/login)
- [x] Built JWT token generation and verification
- [x] Created authentication middleware
- [x] Protected user routes with authentication

### Key Concepts:

| Concept | What It Does |
|---------|-------------|
| bcrypt.hash() | Converts password to unreadable hash |
| bcrypt.compare() | Checks if password matches hash |
| jwt.sign() | Creates a JWT token |
| jwt.verify() | Validates a JWT token |
| Auth Middleware | Checks token before allowing access |

### What's Coming Tomorrow?

**Day 4: Role-Based Access Control** - We'll add Admin vs User roles. Admins will be able to manage all users and tasks, while regular users can only manage their own data.

---

### Quick Quiz

1. Why do we hash passwords instead of encrypting them?
2. What are the 3 parts of a JWT token?
3. Why do we say "Invalid email or password" instead of "Email not found"?
4. What does the `authenticate` middleware do?
5. Where should the JWT token be sent in HTTP requests?

**Answers:**
1. Hashing is one-way (can't be reversed), encryption is two-way (can be decrypted). If the database is stolen, hashed passwords are useless to hackers.
2. Header, Payload, Signature
3. To prevent hackers from discovering which emails exist in our system
4. Extracts JWT from Authorization header, verifies it, and attaches user data to `req.user`
5. In the `Authorization` header as `Bearer <token>`

---

> **Great job completing Day 3!** Your API is now secure with authentication. Tomorrow we add role-based access control!
