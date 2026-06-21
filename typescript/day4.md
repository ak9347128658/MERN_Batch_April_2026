** Day 4 **

Great example. The best way to understand `public`, `private`, and `protected` is to see **where they can and cannot be accessed**.

---

# 1. public

`public` members can be accessed from anywhere.

```ts
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("Asif");

// ✅ Accessible outside class
console.log(user.name);
```

Output:

```bash
Asif
```

### Usage

Use `public` for data and methods that other parts of your application should be able to access.

Example:

```ts
class BankAccount {
  public accountNumber: string;

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  public getAccountInfo() {
    return `Account: ${this.accountNumber}`;
  }
}

const account = new BankAccount("12345");

console.log(account.accountNumber);
console.log(account.getAccountInfo());
```

---

# 2. private

`private` members can only be used inside the same class.

```ts
class User {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }
}

const user = new User("asif@example.com");

// ❌ Error
console.log(user.email);
```

TypeScript Error:

```bash
Property 'email' is private and only accessible within class 'User'
```

---

## Why use private?

Imagine a bank account.

You don't want users changing balance directly.

### Wrong

```ts
class BankAccount {
  public balance: number = 1000;
}

const account = new BankAccount();

account.balance = -50000; // Wrong
```

Anyone can modify balance.

---

### Correct

```ts
class BankAccount {
  private balance: number = 1000;

  public deposit(amount: number) {
    this.balance += amount;
  }

  public getBalance() {
    return this.balance;
  }
}

const account = new BankAccount();

account.deposit(500);

console.log(account.getBalance());

// ❌ Error
// account.balance = 100000;
```

Output:

```bash
1500
```

### Real-world usage

* Password
* Email
* Balance
* API Keys
* Internal calculations

---

# 3. protected

`protected` members can be used:

✅ Inside the class

✅ Inside child classes (inheritance)

❌ Outside the class

---

Example:

```ts
class User {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Admin extends User {
  public showName() {
    return this.name;
  }
}

const admin = new Admin("Asif");

console.log(admin.showName());

// ❌ Error
// console.log(admin.name);
```

Output:

```bash
Asif
```

---

## Why use protected?

Suppose every employee has a salary.

Child classes need salary.

Outside world should not access salary directly.

```ts
class Employee {
  protected salary: number;

  constructor(salary: number) {
    this.salary = salary;
  }
}

class Manager extends Employee {
  public showSalary() {
    return this.salary;
  }
}

const manager = new Manager(50000);

console.log(manager.showSalary());

// ❌ Error
// console.log(manager.salary);
```

Output:

```bash
50000
```

---

# Complete Example

```ts
class User {
  public id: number;
  private email: string;
  protected name: string;

  constructor(
    id: number,
    name: string,
    email: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public greet() {
    return `Hello ${this.name}`;
  }

  public getEmail() {
    return this.email;
  }
}

class Admin extends User {
  private role: string;

  constructor(
    id: number,
    name: string,
    email: string,
    role: string
  ) {
    super(id, name, email);
    this.role = role;
  }

  public getAdminInfo() {
    return {
      id: this.id,          // ✅ public
      name: this.name,      // ✅ protected
      role: this.role
    };
  }
}

const admin = new Admin(
  1,
  "Asif",
  "asif@example.com",
  "Super Admin"
);

console.log(admin.id); // ✅ public

console.log(admin.greet());

console.log(admin.getEmail());

// ❌ private
// console.log(admin.email);

// ❌ protected
// console.log(admin.name);

console.log(admin.getAdminInfo());
```

Output:

```bash
1

Hello Asif

asif@example.com

{
  id: 1,
  name: 'Asif',
  role: 'Super Admin'
}
```

---

# Interview Shortcut

| Modifier  | Same Class | Child Class | Outside Class |
| --------- | ---------- | ----------- | ------------- |
| public    | ✅          | ✅           | ✅             |
| private   | ✅          | ❌           | ❌             |
| protected | ✅          | ✅           | ❌             |

### Easy Memory Trick

* **public** → Everyone can access.
* **private** → Only this class can access.
* **protected** → This class + child classes can access.

Think of a house:

* **public** = Living room (everyone can enter)
* **protected** = Family room (family/children only)
* **private** = Personal locker (only owner can open)


2. Inheritance & Polymorphism 
TypeScriptabstract class BaseEntity {
  protected id: number;
  protected createdAt: Date = new Date();

  constructor(id: number) {
    this.id = id;
  }

  abstract getDetails(): string; // Must be implemented by child classes
}

class Project extends BaseEntity {
  private tasks: Task[] = [];

  constructor(id: number, public name: string) {
    super(id);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  getDetails(): string {
    return `Project ${this.name} has ${this.tasks.length} tasks`;
  }
}

3. Generics – The Game Changer (25 mins)
Generics allow you to write reusable, type-safe code. This is where TypeScript really shines.
TypeScript// Generic function
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(42));
Generic Interfaces & Classes
TypeScriptinterface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  save(item: T): void;
}

class InMemoryRepository<T> implements Repository<T> {
  private items: T[] = [];

  getById(id: number): T | undefined {
    // For demo - in real app you would use proper lookup
    return this.items.find((item: any) => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  save(item: T): void {
    this.items.push(item);
  }
}

// Usage
const userRepo = new InMemoryRepository<User>();
const taskRepo = new InMemoryRepository<Task>();

userRepo.save(user1);
taskRepo.save(task1);

Sure. The power of **Generics (`<T>`)** is that the same repository class can work with **User**, **Task**, **Product**, **Employee**, or any other type.

---

# Step 1: Define Some Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Employee {
  id: number;
  name: string;
  department: string;
}
```

---

# Step 2: Generic Repository

```typescript
interface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  save(item: T): void;
}

class InMemoryRepository<T> implements Repository<T> {
  private items: T[] = [];

  getById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  save(item: T): void {
    this.items.push(item);
  }
}
```

---

# Step 3: Create User Repository

```typescript
const userRepo = new InMemoryRepository<User>();

const user1: User = {
  id: 1,
  name: "Asif",
  email: "asif@gmail.com"
};

const user2: User = {
  id: 2,
  name: "John",
  email: "john@gmail.com"
};

userRepo.save(user1);
userRepo.save(user2);
```

### Get User

```typescript
console.log(userRepo.getById(1));
```

Output:

```typescript
{
  id: 1,
  name: "Asif",
  email: "asif@gmail.com"
}
```

### Get All Users

```typescript
console.log(userRepo.getAll());
```

Output:

```typescript
[
  {
    id: 1,
    name: "Asif",
    email: "asif@gmail.com"
  },
  {
    id: 2,
    name: "John",
    email: "john@gmail.com"
  }
]
```

---

# Step 4: Create Task Repository

```typescript
const taskRepo = new InMemoryRepository<Task>();

const task1: Task = {
  id: 1,
  title: "Learn TypeScript",
  completed: false
};

const task2: Task = {
  id: 2,
  title: "Build API",
  completed: true
};

taskRepo.save(task1);
taskRepo.save(task2);
```

### Get Task

```typescript
console.log(taskRepo.getById(2));
```

Output:

```typescript
{
  id: 2,
  title: "Build API",
  completed: true
}
```

---

# Step 5: Create Product Repository

```typescript
const productRepo = new InMemoryRepository<Product>();

const product1: Product = {
  id: 1,
  name: "Laptop",
  price: 75000
};

const product2: Product = {
  id: 2,
  name: "Mouse",
  price: 1000
};

productRepo.save(product1);
productRepo.save(product2);
```

### Get Product

```typescript
console.log(productRepo.getById(1));
```

Output:

```typescript
{
  id: 1,
  name: "Laptop",
  price: 75000
}
```

---

# Step 6: Create Employee Repository

```typescript
const employeeRepo = new InMemoryRepository<Employee>();

const emp1: Employee = {
  id: 1,
  name: "David",
  department: "Engineering"
};

const emp2: Employee = {
  id: 2,
  name: "Sarah",
  department: "HR"
};

employeeRepo.save(emp1);
employeeRepo.save(emp2);
```

### Get Employee

```typescript
console.log(employeeRepo.getById(2));
```

Output:

```typescript
{
  id: 2,
  name: "Sarah",
  department: "HR"
}
```

---

# What TypeScript Understands

```typescript
const user = userRepo.getById(1);
```

Type:

```typescript
User | undefined
```

---

```typescript
const task = taskRepo.getById(1);
```

Type:

```typescript
Task | undefined
```

---

```typescript
const product = productRepo.getById(1);
```

Type:

```typescript
Product | undefined
```

---

# Real World Analogy

Imagine a **warehouse shelf**.

Without Generics:

```typescript
UserRepository
TaskRepository
ProductRepository
EmployeeRepository
```

You create separate shelves for every item type.

With Generics:

```typescript
InMemoryRepository<T>
```

One smart shelf can store anything:

```typescript
new InMemoryRepository<User>()
new InMemoryRepository<Task>()
new InMemoryRepository<Product>()
new InMemoryRepository<Employee>()
```

The repository logic is written **once**, but TypeScript automatically changes the type based on `T`.

This is one of the most common patterns used in:

* Backend APIs
* TypeORM Repositories
* Mongoose Repositories
* Service Layers
* Clean Architecture
* Domain Driven Design (DDD) repositories

4. Modules in TypeScript 
In real projects, we split code into files.
day3/models.ts
TypeScriptexport interface User {
  id: number;
  name: string;
  email: string;
}

export enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN_PROGRESS",
  Done = "DONE"
}
day3/repositories.ts
TypeScriptimport { User, TaskStatus } from "./models.js";

export class UserRepository {
  private users: User[] = [];

  add(user: User): void {
    this.users.push(user);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}
day3/main.ts
TypeScriptimport { User } from "./models.js";
import { UserRepository } from "./repositories.js";

const repo = new UserRepository();
repo.add({ id: 1, name: "Asif", email: "asif@example.com" });

Utility Types (Built-in)
TypeScript ships with many helpful utility types.

Here's a **real-world implementation** of all four utility types (`Pick`, `Partial`, `Omit`, `Readonly`) using a User Management System example.

---

# 1. Base Interface

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}
```

Example User:

```typescript
const user: User = {
  id: 1,
  name: "Asif",
  email: "asif@gmail.com",
  age: 25,
  isActive: true,
  createdAt: new Date()
};
```

---

# 2. Pick<T, K>

Used when you need only a few properties from an object.

```typescript
type UserPreview = Pick<User, "id" | "name" | "email">;
```

Implementation:

```typescript
const userPreview: UserPreview = {
  id: 1,
  name: "Asif",
  email: "asif@gmail.com"
};

console.log(userPreview);
```

Output:

```javascript
{
  id: 1,
  name: "Asif",
  email: "asif@gmail.com"
}
```

### Real Use Case

API returns only basic user information:

```typescript
function getUserPreview(user: User): UserPreview {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

console.log(getUserPreview(user));
```

---

# 3. Partial<T>

Makes every property optional.

```typescript
type UserUpdate = Partial<User>;
```

Equivalent to:

```typescript
{
  id?: number;
  name?: string;
  email?: string;
  age?: number;
  isActive?: boolean;
  createdAt?: Date;
}
```

Implementation:

```typescript
function updateUser(
  existingUser: User,
  updates: Partial<User>
): User {
  return {
    ...existingUser,
    ...updates
  };
}
```

Usage:

```typescript
const updatedUser = updateUser(user, {
  name: "Mohammed Asif",
  age: 26
});

console.log(updatedUser);
```

Output:

```javascript
{
  id: 1,
  name: "Mohammed Asif",
  email: "asif@gmail.com",
  age: 26,
  isActive: true,
  createdAt: ...
}
```

### Why Partial?

Without Partial:

```typescript
updateUser(user, {
  name: "New Name"
});
```

❌ Error because all User fields would be required.

With Partial:

```typescript
updateUser(user, {
  name: "New Name"
});
```

✅ Valid

---

# 4. Omit<T, K>

Removes specified properties.

```typescript
type UserWithoutDates = Omit<User, "createdAt">;
```

Equivalent to:

```typescript
{
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}
```

Implementation:

```typescript
const userData: UserWithoutDates = {
  id: 1,
  name: "Asif",
  email: "asif@gmail.com",
  age: 25,
  isActive: true
};
```

### Real Use Case

Before sending response to frontend:

```typescript
function prepareResponse(user: User): UserWithoutDates {
  const { createdAt, ...rest } = user;
  return rest;
}

console.log(prepareResponse(user));
```

Output:

```javascript
{
  id: 1,
  name: "Asif",
  email: "asif@gmail.com",
  age: 25,
  isActive: true
}
```

---

# 5. Readonly<T>

Makes all properties immutable.

```typescript
type ReadonlyUser = Readonly<User>;
```

Implementation:

```typescript
const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "Asif",
  email: "asif@gmail.com",
  age: 25,
  isActive: true,
  createdAt: new Date()
};
```

Reading values:

```typescript
console.log(readonlyUser.name);
```

Trying to modify:

```typescript
readonlyUser.name = "Ahmed";
```

❌ Compile Error

```typescript
Cannot assign to 'name'
because it is a read-only property.
```

### Real Use Case

Configuration object:

```typescript
const APP_CONFIG: Readonly<{
  appName: string;
  version: string;
}> = {
  appName: "SkillBridge",
  version: "1.0.0"
};

// APP_CONFIG.version = "2.0.0"; ❌ Error
```

---

# Combined Example

Imagine a User Service:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}

type UserPreview = Pick<User, "id" | "name">;
type UserUpdate = Partial<User>;
type UserResponse = Omit<User, "createdAt">;
type ReadonlyUser = Readonly<User>;

class UserService {

  getPreview(user: User): UserPreview {
    return {
      id: user.id,
      name: user.name
    };
  }

  update(
    user: User,
    updates: UserUpdate
  ): User {
    return {
      ...user,
      ...updates
    };
  }

  prepareResponse(
    user: User
  ): UserResponse {
    const { createdAt, ...rest } = user;
    return rest;
  }
}
```

### Interview Summary

| Utility Type  | Purpose                  | Example                      |
| ------------- | ------------------------ | ---------------------------- |
| `Pick<T,K>`   | Select specific fields   | User card, API response      |
| `Partial<T>`  | Make all fields optional | Update APIs (PATCH)          |
| `Omit<T,K>`   | Remove fields            | Hide sensitive/internal data |
| `Readonly<T>` | Prevent modification     | Config objects, constants    |

A common Node.js/TypeScript backend pattern is:

```typescript
// Create API
type CreateUserDto = Omit<User, "id" | "createdAt">;

// Update API
type UpdateUserDto = Partial<CreateUserDto>;

// List API
type UserListDto = Pick<User, "id" | "name" | "email">;
```

This pattern is used extensively in NestJS, Express, Hapi.js, and enterprise TypeScript applications.
