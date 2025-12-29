# Node.js & Express.js - Complete Guide

## What is Backend?

- **Backend** = Server-side of an application
- Handles business logic, database operations, authentication
- Not directly visible to users (unlike frontend/UI)
- Processes requests from frontend and returns responses
- Examples: APIs, databases, user authentication, file storage

---

## What is a Server?

- A **server** is a computer/program that listens for requests and sends responses
- Handles HTTP requests (GET, POST, PUT, DELETE)
- Runs 24/7 to serve client requests
- Node.js allows creating servers using JavaScript
```javascript
// Basic HTTP server without Express
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

---

## How Node.js Works

### Architecture
- **Single-threaded** with **Event Loop**
- **Non-blocking I/O** - doesn't wait for operations to complete
- **Asynchronous** - handles multiple operations concurrently
- Built on **V8 JavaScript Engine** (same as Chrome)

### Event Loop

The Event Loop is the heart of Node.js that enables non-blocking operations.
```
   ┌───────────────────────────┐
┌─>│           timers          │  (setTimeout, setInterval)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  (I/O callbacks)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  (internal)
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │  (setImmediate)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  (socket.on('close'))
   └───────────────────────────┘
```

### Event Loop Phases

1. **Timers** - Executes callbacks from `setTimeout()` and `setInterval()`
2. **Pending Callbacks** - Executes I/O callbacks deferred from previous cycle
3. **Poll** - Retrieves new I/O events; executes I/O related callbacks
4. **Check** - Executes `setImmediate()` callbacks
5. **Close Callbacks** - Executes close event callbacks (e.g., `socket.on('close')`)

### How It Works in Practice
```javascript
console.log('1 - Start');

setTimeout(() => {
  console.log('3 - Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('2 - Promise');
});

console.log('4 - End');

// Output:
// 1 - Start
// 4 - End
// 2 - Promise  (microtask - higher priority)
// 3 - Timeout  (macrotask - event loop)
```

### Why Node.js is Fast
- **Non-blocking I/O** - doesn't wait for file/database operations
- **Event-driven** - handles requests asynchronously
- **Single thread** - no context switching overhead
- Perfect for I/O-heavy applications (APIs, real-time apps)

---

## Express.js Basics

### What is Express?
- Minimal and flexible Node.js web framework
- Simplifies server creation and routing
- Provides middleware system
- Most popular Node.js framework

### Basic Express Server
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Middleware

### What is Middleware?
- Functions that execute **between** receiving a request and sending a response
- Have access to `req`, `res`, and `next()`
- Can modify request/response objects
- Can end request-response cycle or call `next()` to pass control

### Middleware Flow
```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### Types of Middleware

#### 1. Application-level Middleware
```javascript
// Executes for ALL routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass to next middleware
});
```

#### 2. Router-level Middleware
```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});
```

#### 3. Built-in Middleware
```javascript
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public'));          // Serve static files
```

#### 4. Third-party Middleware
```javascript
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());           // Enable CORS
app.use(morgan('dev'));    // Logging
```

#### 5. Error-handling Middleware
```javascript
// Must have 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

#### 6. Custom Middleware
```javascript
// Authentication middleware
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // Verify token
  req.user = { id: 123, name: 'John' };
  next();
};

// Use in routes
app.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});
```

### Middleware Order Matters!
```javascript
// CORRECT ORDER
app.use(express.json());        // Parse body first
app.use(logger);                // Log request
app.get('/users', getUsers);    // Route handler
app.use(errorHandler);          // Error handler last

// WRONG ORDER
app.get('/users', getUsers);    // Routes before middleware won't work
app.use(express.json());        // Too late!
```

---

## Complete REST API Example
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fake database
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// GET - Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET - Get single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST - Create new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// DELETE - Delete user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## Request Object (req)

### Most Important Properties
```javascript
app.get('/example', (req, res) => {
  
  // URL Parameters
  req.params.id           // /users/:id → params.id
  
  // Query Strings
  req.query.search        // /search?search=node → query.search
  req.query.page          // /users?page=2 → query.page
  
  // Request Body (POST/PUT)
  req.body.username       // JSON/form data
  req.body.password
  
  // Headers
  req.headers             // All headers
  req.headers['content-type']
  req.headers['authorization']
  req.get('Authorization') // Alternative way
  
  // HTTP Method
  req.method              // GET, POST, PUT, DELETE
  
  // URL Information
  req.url                 // Full URL: /users?page=2
  req.path                // Path only: /users
  req.originalUrl         // Original URL
  req.baseUrl             // Base URL (for routers)
  
  // Request Details
  req.ip                  // Client IP address
  req.hostname            // Host name
  req.protocol            // http or https
  
  // Cookies (needs cookie-parser)
  req.cookies.sessionId   // Access cookies
  
  // Files (needs multer)
  req.file                // Single file upload
  req.files               // Multiple files
});
```

### Common Request Examples
```javascript
// URL params: GET /users/123
app.get('/users/:id', (req, res) => {
  console.log(req.params.id); // "123"
});

// Query strings: GET /search?q=node&limit=10
app.get('/search', (req, res) => {
  console.log(req.query.q);      // "node"
  console.log(req.query.limit);  // "10"
});

// POST body: POST /login with JSON { "email": "user@example.com" }
app.post('/login', (req, res) => {
  console.log(req.body.email);    // "user@example.com"
  console.log(req.body.password); // password from body
});

// Headers: GET /api with Authorization header
app.get('/api', (req, res) => {
  const token = req.headers['authorization'];
  console.log(token); // "Bearer xyz123..."
});
```

---

## Response Object (res)

### Most Important Methods
```javascript
app.get('/example', (req, res) => {
  
  // Send Response
  res.send('Hello')                    // Send string/HTML/Buffer
  res.json({ key: 'value' })          // Send JSON (most common for APIs)
  res.sendFile('/path/to/file.html')  // Send file
  
  // Status Codes
  res.status(404)                     // Set status code
  res.status(200).send('OK')          // Chain status + response
  res.sendStatus(200)                 // Send status with message
  
  // Redirects
  res.redirect('/other-page')         // Redirect to URL
  res.redirect(301, '/moved')         // Permanent redirect
  
  // Headers
  res.set('Content-Type', 'text/html')  // Set single header
  res.setHeader('X-Custom', 'value')    // Set header
  res.type('json')                      // Set Content-Type
  
  // Cookies
  res.cookie('name', 'value')           // Set cookie
  res.cookie('token', 'abc123', {       // Set with options
    httpOnly: true,
    maxAge: 900000
  });
  res.clearCookie('name')               // Delete cookie
  
  // Download
  res.download('/path/to/file.pdf')     // Prompt download
  res.attachment('filename.pdf')        // Set download filename
  
  // Render (with template engines)
  res.render('index', { data })         // Render view template
  
  // End Response
  res.end()                             // End without data
});
```

### Response Status Codes
```javascript
// Success
res.status(200)  // OK
res.status(201)  // Created
res.status(204)  // No Content

// Client Errors
res.status(400)  // Bad Request
res.status(401)  // Unauthorized
res.status(403)  // Forbidden
res.status(404)  // Not Found
res.status(422)  // Unprocessable Entity

// Server Errors
res.status(500)  // Internal Server Error
res.status(503)  // Service Unavailable
```

### Common Response Patterns
```javascript
// 1. Success Response
app.get('/users', (req, res) => {
  const users = [{ id: 1, name: 'John' }];
  res.status(200).json({ success: true, data: users });
});

// 2. Error Response
app.get('/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'User not found' 
    });
  }
  res.json({ success: true, data: user });
});

// 3. Created Response
app.post('/users', (req, res) => {
  const newUser = createUser(req.body);
  res.status(201).json({ 
    success: true, 
    message: 'User created',
    data: newUser 
  });
});

// 4. Redirect Response
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});

// 5. File Download
app.get('/download', (req, res) => {
  res.download('./files/document.pdf');
});
```

---

## Request-Response Cycle
```
1. Client sends HTTP request
   ↓
2. Express receives request
   ↓
3. Middleware chain executes
   - Body parsing
   - Authentication
   - Logging
   ↓
4. Route handler executes
   - Access req.params, req.body, etc.
   - Business logic
   - Database operations
   ↓
5. Response sent back
   - res.json(), res.send(), etc.
   ↓
6. Client receives response
```

---

## Environment Setup
```javascript
// Install Node.js packages
npm init -y
npm install express
npm install --save-dev nodemon

// package.json scripts
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

// Run development server
npm run dev
```

---

## Project Structure
```
project/
├── node_modules/
├── routes/
│   ├── userRoutes.js
│   └── productRoutes.js
├── controllers/
│   ├── userController.js
│   └── productController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   └── User.js
├── .env
├── .gitignore
├── package.json
└── server.js
```