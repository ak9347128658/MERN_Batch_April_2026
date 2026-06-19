**✅ Day 3 – Welcome back!**

Great job completing Day 1. Today we’re going deeper. We’ll spend the next **1 to 1.5 hours** together.

---


- TypeScript = JavaScript + Static Types
- Setup with `tsconfig.json`
- Basic types: `string`, `number`, `boolean`, `any`, `unknown`
- Variables (`const`/`let`)
- Functions with parameter & return types
- Arrays & Tuples

If anything from yesterday is unclear, tell me now.

---


In real applications, almost everything is an object. Let’s define them properly.

```typescript
// Inline object type (good for small things)
let point: { x: number; y: number } = { x: 10, y: 20 };

// But this gets messy fast. Better ways coming...
```

#### **Type Aliases** (`type`)

```typescript
type Point = {
  x: number;
  y: number;
  label?: string;        // optional property
};

const origin: Point = { x: 0, y: 0 };
const p1: Point = { x: 5, y: 10, label: "Start" };
```

#### **Readonly Properties**

```typescript
type UserSettings = {
  readonly theme: "light" | "dark";
  readonly version: string;
};

const settings: UserSettings = {
  theme: "dark",
  version: "2.1.0"
};

// settings.theme = "light"; // ❌ Error - readonly
```

---

`interface` is the **most used** way to define object shapes in real codebases (especially in React, Node.js, Angular, etc.).

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;           // optional
  isActive: boolean;
  readonly createdAt: Date;
}

const user1: User = {
  id: 1,
  name: "Asif",
  email: "asif@example.com",
  isActive: true,
  createdAt: new Date()
};
```

**Key Differences: `type` vs `interface`**

| Feature                  | `type`                     | `interface`                  |
|-------------------------|----------------------------|------------------------------|
| Can extend              | Yes (`&`)                  | Yes (`extends`)              |
| Can merge declarations  | No                         | Yes (Declaration Merging)    |
| For objects             | Good                       | Preferred in most teams      |
| Union/Intersection      | Excellent                  | Limited                      |

**Real-world example:**

```typescript
interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Extending interface
interface Task extends BaseEntity {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  assigneeId?: number;
  priority: number;
}

const task: Task = {
  id: 101,
  title: "Implement User Authentication",
  status: "in-progress",
  priority: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};
```

---

# TypeScript Interfaces & Classes Masterclass

Imagine we are in a real classroom and today is **Day 4 of TypeScript**.

Today we'll learn:

1. What is an Interface?
2. Why do we need Interfaces?
3. How to create an Interface?
4. Interface Inheritance (`extends`)
5. What is a Class?
6. Implementing Interfaces using Classes (`implements`)
7. Class Inheritance (`extends`)
8. Real-world Employee Management System Example

---

# 1. What is an Interface?

An **Interface** is a blueprint or contract.

It tells TypeScript:

> "Any object or class that follows this interface must have these properties and methods."

Think about driving.

A car must have:

* Engine
* Start method
* Stop method

That's a contract.

```typescript
interface Car {
    brand: string;
    start(): void;
}
```

Now every Car must have:

* `brand`
* `start()`

---

# 2. Basic Interface Example

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}
```

Using it:

```typescript
const user: User = {
    id: 1,
    name: "Asif",
    email: "asif@gmail.com"
};
```

### Explanation

```typescript
id: number
```

Must be number.

```typescript
name: string
```

Must be string.

```typescript
email: string
```

Must be string.

If you miss any property:

```typescript
const user: User = {
    id: 1
};
```

❌ Error

Because interface contract is not fulfilled.

---

# 3. Interface with Methods

```typescript
interface Employee {
    name: string;
    work(): void;
}
```

Usage:

```typescript
const emp: Employee = {
    name: "Asif",

    work() {
        console.log("Working...");
    }
};

emp.work();
```

Output:

```bash
Working...
```

---

# 4. Interface Extending Interface

Sometimes one interface needs properties from another interface.

Use:

```typescript
extends
```

Example:

```typescript
interface Person {
    id: number;
    name: string;
}

interface Employee extends Person {
    salary: number;
}
```

Now Employee automatically gets:

```typescript
id
name
salary
```

Usage:

```typescript
const emp: Employee = {
    id: 1,
    name: "Asif",
    salary: 50000
};
```

---

## Multiple Interface Extension

```typescript
interface Person {
    name: string;
}

interface Contact {
    email: string;
}

interface Employee extends Person, Contact {
    salary: number;
}
```

Usage:

```typescript
const emp: Employee = {
    name: "Asif",
    email: "asif@gmail.com",
    salary: 50000
};
```

---

# 5. What is a Class?

A Class is a blueprint for creating objects.

Example:

```typescript
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}
```

Creating object:

```typescript
const user = new User("Asif");

user.greet();
```

Output:

```bash
Hello Asif
```

---

# 6. Interface + Class (implements)

Most important interview topic.

Interface defines rules.

Class follows rules using:

```typescript
implements
```

Example:

```typescript
interface Employee {
    id: number;
    name: string;

    work(): void;
}
```

Class:

```typescript
class SoftwareEngineer implements Employee {

    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    work(): void {
        console.log(`${this.name} is coding`);
    }
}
```

Usage:

```typescript
const dev = new SoftwareEngineer(
    1,
    "Asif"
);

dev.work();
```

Output:

```bash
Asif is coding
```

---

# Why use implements?

Without interface:

```typescript
class Developer {
}
```

Anyone can create anything.

With interface:

```typescript
class Developer implements Employee
```

TypeScript forces us to follow contract.

Missing property:

```typescript
class Developer implements Employee {

    id: number = 1;

    work() {
        console.log("Coding");
    }
}
```

❌ Error

Because `name` is missing.

---

# 7. Class Inheritance (extends)

One class can inherit another class.

Parent Class:

```typescript
class Person {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    introduce() {
        console.log(`I am ${this.name}`);
    }
}
```

Child Class:

```typescript
class Employee extends Person {

    salary: number;

    constructor(
        name: string,
        salary: number
    ) {
        super(name);

        this.salary = salary;
    }

    showSalary() {
        console.log(
            `Salary: ${this.salary}`
        );
    }
}
```

Usage:

```typescript
const emp = new Employee(
    "Asif",
    60000
);

emp.introduce();
emp.showSalary();
```

Output:

```bash
I am Asif
Salary: 60000
```

---

# Difference Between extends and implements

| Feature                 | extends | implements            |
| ----------------------- | ------- | --------------------- |
| Used with Class         | ✅       | ✅                     |
| Used with Interface     | ✅       | ❌                     |
| Inherits implementation | ✅       | ❌                     |
| Inherits properties     | ✅       | ✅                     |
| Inherits methods        | ✅       | Method signature only |
| Reuse code              | ✅       | ❌                     |

### extends

```typescript
class Employee extends Person
```

Gets:

```typescript
Person properties
Person methods
```

---

### implements

```typescript
class Employee implements User
```

Gets:

```typescript
Contract only
```

Must write own code.

---

# Real World Example

## Step 1: Interface

```typescript
interface User {

    id: number;
    name: string;

    login(): void;
}
```

---

## Step 2: Base Class

```typescript
class Person {

    constructor(
        public id: number,
        public name: string
    ) {}
}
```

---

## Step 3: Developer Class

```typescript
class Developer
    extends Person
    implements User {

    constructor(
        id: number,
        name: string,
        public skill: string
    ) {
        super(id, name);
    }

    login(): void {
        console.log(
            `${this.name} logged in`
        );
    }

    code(): void {
        console.log(
            `${this.name} writes ${this.skill}`
        );
    }
}
```

---

## Step 4: Create Object

```typescript
const dev = new Developer(
    1,
    "Asif",
    "TypeScript"
);

dev.login();

dev.code();
```

Output:

```bash
Asif logged in
Asif writes TypeScript
```

---

# Complete Interview Example

```typescript
interface Vehicle {

    brand: string;

    start(): void;
}

class Machine {

    powerOn() {
        console.log("Power ON");
    }
}

class Car
    extends Machine
    implements Vehicle {

    constructor(
        public brand: string
    ) {
        super();
    }

    start(): void {
        console.log(
            `${this.brand} Started`
        );
    }
}

const bmw = new Car("BMW");

bmw.powerOn();
bmw.start();
```

Output:

```bash
Power ON
BMW Started
```

---

# Interview Questions

### Q1. What is Interface?

A contract that defines structure of an object or class.

### Q2. Difference between Interface and Class?

| Interface                  | Class                   |
| -------------------------- | ----------------------- |
| Contract                   | Blueprint               |
| No implementation required | Contains implementation |
| Cannot create object       | Can create object       |
| Used for typing            | Used for logic          |

### Q3. Difference between extends and implements?

```typescript
extends
```

Inherits code from parent.

```typescript
implements
```

Follows rules of interface.

### Q4. Can a class implement multiple interfaces?

Yes.

```typescript
class Employee
implements User, Contact, Address
{
}
```

### Q5. Can an interface extend multiple interfaces?

Yes.

```typescript
interface Employee
extends User, Contact
{
}
```

This combination is very common in real Node.js, React, NestJS, Angular, and enterprise TypeScript projects:

```typescript
interface IUser {
    id: number;
    name: string;
}

class BaseEntity {
    createdAt = new Date();
}

class User
    extends BaseEntity
    implements IUser {

    constructor(
        public id: number,
        public name: string
    ) {
        super();
    }
}
```

Here:

* `IUser` = contract (what data is required)
* `BaseEntity` = reusable code (createdAt, updatedAt, etc.)
* `User` = actual implementation



Enums make your code more readable and less error-prone.

```typescript
enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN_PROGRESS",
  Review = "REVIEW",
  Done = "DONE"
}

enum UserRole {
  Admin = 1,
  Manager = 2,
  Developer = 3,
  Intern = 4
}

const currentTaskStatus = TaskStatus.InProgress;
console.log(currentTaskStatus); // "IN_PROGRESS"
```

**Real usage**:

```typescript
function updateTaskStatus(taskId: number, status: TaskStatus) {
  console.log(`Task ${taskId} moved to ${status}`);
}

updateTaskStatus(101, TaskStatus.Done);
```

---

### **4. Union & Intersection Types (15 mins)**

**Union (`|`)** — can be one of several types

```typescript
type ID = string | number;

function printId(id: ID) {
  console.log(`ID: ${id}`);
}

printId(123);      // OK
printId("user-456"); // OK
```

**Intersection (`&`)** — combine types

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "Asif",
  age: 28
};
```

---


This is one of the most powerful features in TypeScript.

```typescript
function processInput(input: string | number | boolean) {
  if (typeof input === "string") {
    console.log(input.toUpperCase());     // TypeScript knows it's string
  } else if (typeof input === "number") {
    console.log(input.toFixed(2));
  } else {
    console.log(input ? "Yes" : "No");
  }
}
```

**User-defined Type Guard**

```typescript
interface Admin {
  role: "admin";
  permissions: string[];
}

interface RegularUser {
  role: "user";
}

function isAdmin(user: Admin | RegularUser): user is Admin {
  return user.role === "admin";
}

function handleUser(user: Admin | RegularUser) {
  if (isAdmin(user)) {
    console.log("Admin permissions:", user.permissions);
  } else {
    console.log("Regular user");
  }
}
```

**Real example with `in` operator**:

```typescript
interface ApiResponseSuccess {
  success: true;
  data: any;
}

interface ApiResponseError {
  success: false;
  error: string;
}

function handleResponse(response: ApiResponseSuccess | ApiResponseError) {
  if (response.success) {
    console.log("Data received:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}
```

---

Let’s build something real.


```typescript
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: number;
  dueDate?: Date;
}

enum TaskStatus {
  Todo = "TODO",
  InProgress = "IN_PROGRESS",
  Done = "DONE"
}

class TaskManager {
  private tasks: Task[] = [];

  addTask(title: string, priority: number = 1, dueDate?: Date): void {
    const task: Task = {
      id: Date.now(),
      title,
      status: TaskStatus.Todo,
      priority,
      dueDate
    };
    this.tasks.push(task);
    console.log(`✅ Task added: ${title}`);
  }

  listTasks(): void {
    console.table(this.tasks);
  }

  updateStatus(id: number, status: TaskStatus): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      console.log(`Updated task ${id} to ${status}`);
    }
  }
}

// Usage
const manager = new TaskManager();

manager.addTask("Learn TypeScript Interfaces", 1);
manager.addTask("Build Todo App", 2, new Date("2026-06-25"));
manager.listTasks();

manager.updateStatus(manager.tasks[0].id, TaskStatus.InProgress);
manager.listTasks();
```

Run it:
```bash
tsc day2-task-manager.ts
node day2-task-manager.js
```

---

### **Homework for Day 2**

1. Extend the `TaskManager` class:
   - Add `deleteTask(id: number)`
   - Add `getHighPriorityTasks()` that returns tasks with priority ≥ 2
   - Add proper types everywhere

2. Create an `User` interface and a `UserManager` class similar to TaskManager.

3. Try using both `type` and `interface` and observe the differences.

---

