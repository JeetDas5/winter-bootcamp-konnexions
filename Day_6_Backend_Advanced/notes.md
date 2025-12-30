# Databases, MongoDB & Mongoose - Complete Guide

## What is a Database?

- **Database** = Organized collection of structured data
- Stores data electronically in a computer system
- Allows easy access, management, and updating of data
- Used to persist data permanently (unlike variables in memory)

### Why Use Databases?
- **Persistence** - Data survives after program restarts
- **Organization** - Structured storage of large amounts of data
- **Efficiency** - Fast retrieval and manipulation
- **Scalability** - Handle growing amounts of data
- **Security** - Control access to sensitive data
- **Concurrent Access** - Multiple users can access simultaneously

---

## SQL vs NoSQL

### SQL (Relational Databases)

**Structure**: Table-based with rows and columns

**Examples**: MySQL, PostgreSQL, Oracle, SQL Server

**Characteristics**:
- **Schema-based** - Fixed structure (columns must be defined)
- **ACID compliant** - Atomicity, Consistency, Isolation, Durability
- **Relationships** - Tables connected via foreign keys
- **Structured Query Language** - SQL for querying

**Example Structure**:
```
Users Table:
+----+---------+-------------------+
| id | name    | email             |
+----+---------+-------------------+
| 1  | John    | john@example.com  |
| 2  | Jane    | jane@example.com  |
+----+---------+-------------------+

Orders Table:
+----+---------+--------+----------+
| id | user_id | amount | status   |
+----+---------+--------+----------+
| 1  | 1       | 100    | pending  |
| 2  | 1       | 50     | completed|
+----+---------+--------+----------+
```

**Pros**:
- Strong data consistency
- Complex queries with JOINs
- Data integrity (relationships enforced)
- Mature and well-established

**Cons**:
- Less flexible (schema changes are difficult)
- Scaling horizontally is complex
- Not ideal for unstructured data

---

### NoSQL (Non-Relational Databases)

**Structure**: Document-based, Key-Value, Graph, or Column-based

**Examples**: MongoDB, CouchDB, Redis, Cassandra, DynamoDB

**Characteristics**:
- **Schema-less** - Flexible structure (no fixed columns)
- **Horizontally scalable** - Easy to distribute across servers
- **Fast** - Optimized for specific use cases
- **No relationships** - Data is typically denormalized (duplicated)

**Example Structure (MongoDB)**:
```javascript
// Users Collection
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John",
  "email": "john@example.com",
  "orders": [
    { "amount": 100, "status": "pending" },
    { "amount": 50, "status": "completed" }
  ]
}

{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "name": "Jane",
  "email": "jane@example.com",
  "orders": []
}
```

**Pros**:
- Flexible schema (easy to modify structure)
- Horizontal scaling (add more servers)
- Fast for large-scale data
- Works well with modern applications (JSON-like)

**Cons**:
- Less data consistency guarantees
- No standard query language
- Data duplication (denormalization)

---

### SQL vs NoSQL Comparison

| Feature | SQL | NoSQL |
|---------|-----|-------|
| **Structure** | Tables with rows/columns | Documents, Key-Value, Graph |
| **Schema** | Fixed (predefined) | Flexible (dynamic) |
| **Scalability** | Vertical (better hardware) | Horizontal (more servers) |
| **Relationships** | Strong (JOINs) | Weak (embedded data) |
| **Best For** | Complex queries, transactions | Large scale, unstructured data |
| **Examples** | MySQL, PostgreSQL | MongoDB, Redis |

### When to Use SQL?
- Financial systems (banking, payments)
- Systems requiring strong data consistency
- Complex relationships between data
- Applications with fixed data structure

### When to Use NoSQL?
- Social media platforms (posts, comments)
- Real-time analytics
- IoT applications (sensor data)
- Content management systems
- Applications with rapidly changing requirements

---

## What is MongoDB?

- **MongoDB** = Popular NoSQL document database
- Stores data in **JSON-like documents** (BSON format)
- **Schema-less** and flexible
- **Scalable** and high-performance
- Part of the **MEAN/MERN stack** (MongoDB, Express, React/Angular, Node)

### Key Concepts

#### 1. Database
- Container for collections
- Example: `myapp_db`

#### 2. Collection
- Group of documents (similar to SQL tables)
- Example: `users`, `products`, `orders`

#### 3. Document
- Individual record (similar to SQL rows)
- Stored as BSON (Binary JSON)
```javascript
// Document example
{
  "_id": ObjectId("507f191e810c19729de860ea"),
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "gaming"]
}
```

### MongoDB Structure
```
Database
  └── Collection (users)
       ├── Document 1 { name: "John", age: 30 }
       ├── Document 2 { name: "Jane", age: 25, city: "NYC" }
       └── Document 3 { name: "Bob", age: 35, country: "USA", hobbies: [] }
```

---

## MongoDB Basics

### Installing MongoDB
```bash
# Install MongoDB Community Edition
# Visit: https://www.mongodb.com/try/download/community

# Install MongoDB Shell (mongosh)
npm install -g mongosh

# Start MongoDB service
# Windows: MongoDB Compass or service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Basic MongoDB Commands
```javascript
// Show all databases
show dbs

// Create/Switch to database
use myapp_db

// Show current database
db

// Show collections
show collections

// Create collection (implicit)
db.users.insertOne({ name: "John" })

// Drop database
db.dropDatabase()

// Drop collection
db.users.drop()
```

### CRUD Operations

#### 1. Create (Insert)
```javascript
// Insert one document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30
})

// Insert multiple documents
db.users.insertMany([
  { name: "Jane", email: "jane@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 35 }
])
```

#### 2. Read (Query)
```javascript
// Find all documents
db.users.find()

// Find with condition
db.users.find({ age: 30 })

// Find one document
db.users.findOne({ email: "john@example.com" })

// Find with multiple conditions
db.users.find({ age: { $gt: 25 }, name: "John" })

// Find with projection (select specific fields)
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Operators
db.users.find({ age: { $gt: 25 } })        // Greater than
db.users.find({ age: { $gte: 25 } })       // Greater than or equal
db.users.find({ age: { $lt: 30 } })        // Less than
db.users.find({ age: { $lte: 30 } })       // Less than or equal
db.users.find({ age: { $ne: 30 } })        // Not equal
db.users.find({ age: { $in: [25, 30] } })  // In array
```

#### 3. Update
```javascript
// Update one document
db.users.updateOne(
  { name: "John" },                    // Filter
  { $set: { age: 31, city: "NYC" } }   // Update
)

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
)

// Replace document
db.users.replaceOne(
  { name: "John" },
  { name: "John Doe", email: "new@example.com", age: 31 }
)

// Increment value
db.users.updateOne(
  { name: "John" },
  { $inc: { age: 1 } }  // Increment age by 1
)
```

#### 4. Delete
```javascript
// Delete one document
db.users.deleteOne({ name: "John" })

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 25 } })

// Delete all documents in collection
db.users.deleteMany({})
```

---

## What is Mongoose?

- **Mongoose** = ODM (Object Data Modeling) library for MongoDB and Node.js
- Provides **schema-based** solution to model data
- Built-in **validation**, **type casting**, **query building**
- Makes working with MongoDB easier in Node.js

### Why Use Mongoose?
- Schema definition (structure for documents)
- Validation (ensure data integrity)
- Relationships (populate references)
- Middleware (hooks like pre/post save)
- Query helpers (simplified syntax)
- Type casting (automatic data conversion)

---

## Mongoose Basics

### Installation & Setup
```bash
npm install mongoose
```
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));

// Modern syntax with options
mongoose.connect('mongodb://localhost:27017/myapp_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Creating a Schema
```javascript
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,        // Validation: field is required
    trim: true             // Remove whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,          // Unique constraint
    lowercase: true        // Convert to lowercase
  },
  age: {
    type: Number,
    min: 0,               // Minimum value
    max: 120,             // Maximum value
    default: 18           // Default value
  },
  password: {
    type: String,
    required: true,
    minlength: 6          // Minimum length
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],  // Only these values allowed
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now     // Default to current date
  },
  hobbies: [String],      // Array of strings
  address: {              // Nested object
    street: String,
    city: String,
    zipCode: Number
  }
});

// Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
```

### Data Types in Mongoose
```javascript
String          // Text
Number          // Integer or decimal
Date            // Date/time
Boolean         // true/false
Array           // []
ObjectId        // Reference to another document
Mixed           // Any type
Buffer          // Binary data
Decimal128      // High precision decimals
Map             // Key-value pairs
```

---

## Mongoose CRUD Operations

### 1. Create (Insert)
```javascript
const User = require('./models/User');

// Method 1: Create and save
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  password: 'password123'
});

newUser.save()
  .then(user => console.log('User created:', user))
  .catch(err => console.error('Error:', err));

// Method 2: Create directly
User.create({
  name: 'Jane Doe',
  email: 'jane@example.com',
  age: 25,
  password: 'password123'
})
  .then(user => console.log('User created:', user))
  .catch(err => console.error('Error:', err));

// Method 3: Insert many
User.insertMany([
  { name: 'User1', email: 'user1@example.com', password: 'pass123' },
  { name: 'User2', email: 'user2@example.com', password: 'pass123' }
])
  .then(users => console.log('Users created:', users))
  .catch(err => console.error('Error:', err));
```

### 2. Read (Query)
```javascript
// Find all
User.find()
  .then(users => console.log(users))
  .catch(err => console.error(err));

// Find with condition
User.find({ age: { $gte: 25 } })
  .then(users => console.log(users));

// Find one
User.findOne({ email: 'john@example.com' })
  .then(user => console.log(user));

// Find by ID
User.findById('507f191e810c19729de860ea')
  .then(user => console.log(user));

// Select specific fields
User.find().select('name email -_id')  // Include name & email, exclude _id
  .then(users => console.log(users));

// Sorting
User.find().sort({ age: -1 })  // -1 = descending, 1 = ascending
  .then(users => console.log(users));

// Limit and skip (pagination)
User.find()
  .limit(10)        // Get only 10 results
  .skip(20)         // Skip first 20 results
  .then(users => console.log(users));

// Chaining
User.find({ status: 'active' })
  .select('name email')
  .sort({ createdAt: -1 })
  .limit(5)
  .then(users => console.log(users));
```

### 3. Update
```javascript
// Update one
User.updateOne(
  { email: 'john@example.com' },  // Filter
  { age: 31, status: 'active' }   // Update
)
  .then(result => console.log('Modified:', result.modifiedCount));

// Update many
User.updateMany(
  { age: { $lt: 25 } },
  { status: 'young' }
)
  .then(result => console.log('Modified:', result.modifiedCount));

// Find and update (returns updated document)
User.findOneAndUpdate(
  { email: 'john@example.com' },
  { age: 32 },
  { new: true }  // Return updated document
)
  .then(user => console.log('Updated user:', user));

// Find by ID and update
User.findByIdAndUpdate(
  '507f191e810c19729de860ea',
  { name: 'John Updated' },
  { new: true }
)
  .then(user => console.log('Updated user:', user));
```

### 4. Delete
```javascript
// Delete one
User.deleteOne({ email: 'john@example.com' })
  .then(result => console.log('Deleted:', result.deletedCount));

// Delete many
User.deleteMany({ age: { $lt: 18 } })
  .then(result => console.log('Deleted:', result.deletedCount));

// Find and delete (returns deleted document)
User.findOneAndDelete({ email: 'john@example.com' })
  .then(user => console.log('Deleted user:', user));

// Find by ID and delete
User.findByIdAndDelete('507f191e810c19729de860ea')
  .then(user => console.log('Deleted user:', user));
```

---

## Mongoose Validation
```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18 years old'],
    max: [100, 'Age cannot exceed 100']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});
```

---

## Mongoose Middleware (Hooks)
```javascript
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// PRE middleware - runs BEFORE save
userSchema.pre('save', async function(next) {
  // Hash password before saving
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// POST middleware - runs AFTER save
userSchema.post('save', function(doc, next) {
  console.log('User saved:', doc.name);
  next();
});

// PRE remove
userSchema.pre('remove', function(next) {
  console.log('Removing user:', this.name);
  next();
});
```

---

## Mongoose Relationships

### One-to-Many with References
```javascript
// Author Schema
const authorSchema = new mongoose.Schema({
  name: String,
  email: String
});
const Author = mongoose.model('Author', authorSchema);

// Book Schema with reference to Author
const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'  // Reference to Author model
  },
  publishedDate: Date
});
const Book = mongoose.model('Book', bookSchema);

// Create author
const author = await Author.create({ name: 'John Doe', email: 'john@example.com' });

// Create book with author reference
const book = await Book.create({
  title: 'Great Book',
  author: author._id  // Store author's ID
});

// Populate (join) - get book with author details
const bookWithAuthor = await Book.findById(book._id).populate('author');
console.log(bookWithAuthor);
// Output: { title: 'Great Book', author: { name: 'John Doe', email: 'john@example.com' } }

// Populate specific fields
const book2 = await Book.findById(book._id).populate('author', 'name');
// Only includes author's name
```

### Embedded Documents (Nested)
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: {
    street: String,
    city: String,
    zipCode: Number
  },
  orders: [{
    product: String,
    quantity: Number,
    price: Number,
    orderDate: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model('User', userSchema);

// Create user with embedded data
const user = await User.create({
  name: 'John',
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'New York',
    zipCode: 10001
  },
  orders: [
    { product: 'Laptop', quantity: 1, price: 1000 },
    { product: 'Mouse', quantity: 2, price: 20 }
  ]
});
```

---

## What is ORM/ODM?

### ORM (Object-Relational Mapping)
- Maps **objects** in code to **tables** in SQL databases
- Allows working with databases using programming language (instead of SQL)
- Examples: **Sequelize** (Node.js), Hibernate (Java), Entity Framework (.NET)

### ODM (Object-Document Mapping)
- Maps **objects** in code to **documents** in NoSQL databases
- Similar to ORM but for document databases
- Example: **Mongoose** for MongoDB

### Benefits of ORM/ODM
- Write database queries using JavaScript/TypeScript
- Type safety and auto-completion
- Database abstraction (switch databases easily)
- Built-in validation and relationships
- Reduces SQL injection risks
- Cleaner and more maintainable code

### Without ORM (Raw SQL)
```javascript
db.query('SELECT * FROM users WHERE age > ?', [25], (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

### With ORM (Sequelize)
```javascript
const users = await User.findAll({
  where: { age: { [Op.gt]: 25 } }
});
```

### Without ODM (Raw MongoDB)
```javascript
db.collection('users').find({ age: { $gt: 25 } }).toArray((err, users) => {
  if (err) throw err;
  console.log(users);
});
```

### With ODM (Mongoose)
```javascript
const users = await User.find({ age: { $gt: 25 } });
```

---

## Complete Example: Express + Mongoose
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 }
});

const User = mongoose.model('User', userSchema);

// Routes
// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single user
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## Best Practices

1. **Always validate user input** (use Mongoose schemas)
2. **Use async/await** with try-catch for error handling
3. **Index frequently queried fields** for better performance
4. **Close database connections** properly
5. **Use environment variables** for connection strings
6. **Don't expose MongoDB directly** to the internet
7. **Use populate sparingly** (can slow down queries)
8. **Implement pagination** for large datasets
9. **Hash passwords** before storing (use bcrypt)
10. **Use virtuals** for computed properties

---

## Environment Variables
```javascript
// .env file
MONGODB_URI=mongodb://localhost:27017/myapp
PORT=3000

// server.js
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
app.listen(process.env.PORT);
```