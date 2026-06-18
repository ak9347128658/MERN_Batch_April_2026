# TypeScript Day 1 – Detailed Notes & Explanation

## 1. What is TypeScript? Why Do We Need It?

Before learning TypeScript, let's understand the problem it solves.

### JavaScript Problem

JavaScript is a **dynamically typed language**.

That means the type of a variable can change anytime.

```javascript
let value = 10;
value = "Asif";
value = true;
```

JavaScript allows this without any errors.

### Real-World Problem

Imagine you are building a banking application.

```javascript
function calculateTax(amount) {
    return amount * 0.18;
}

calculateTax("1000");
```

JavaScript may try to convert the string automatically.

Sometimes it works.

Sometimes it creates bugs.

These bugs are discovered only when the application runs.

In large applications:

* 100+ developers
* 1000+ files
* Millions of users

Such mistakes become expensive.

---

## What TypeScript Does

TypeScript checks your code **before it runs**.

```typescript
function calculateTax(amount: number) {
    return amount * 0.18;
}

calculateTax("1000");
```

Output:

```text
Error:
Argument of type 'string' is not assignable to parameter of type 'number'
```

TypeScript catches the bug during development.

---

## TypeScript Architecture

```text
TypeScript Code (.ts)
          |
          V
   TypeScript Compiler
        (tsc)
          |
          V
 JavaScript Code (.js)
          |
          V
 Browser / Node.js
```

### Important

Browsers cannot run TypeScript directly.

They only understand JavaScript.

So:

```text
Developer writes TypeScript
Compiler converts it to JavaScript
Browser runs JavaScript
```

---

# 2. Environment Setup

## Step 1: Install Node.js

Download:

```text
https://nodejs.org
```

Verify:

```bash
node --version
npm --version
```

Example:

```bash
v22.10.0
10.9.0
```

---

## Step 2: Install TypeScript

```bash
npm install -g typescript
```

Check installation:

```bash
tsc --version
```

Example:

```bash
Version 5.8.2
```

---

## Step 3: Create Project

```bash
mkdir typescript-course
cd typescript-course

mkdir day1
cd day1
```

---

## Step 4: Create tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Explanation

### target

```json
"target": "ES2022"
```

Generated JavaScript version.

---

### module

```json
"module": "CommonJS"
```

Used by Node.js.

---

### strict

```json
"strict": true
```

Enables maximum type checking.

Always keep it true.

---

### esModuleInterop

Helps import libraries easily.

```typescript
import express from "express";
```

---

### skipLibCheck

Makes compilation faster.

---

### forceConsistentCasingInFileNames

Prevents file name case issues.

Example:

```typescript
import User from "./user";
```

vs

```typescript
import User from "./User";
```

TypeScript catches this.

---

# 3. First TypeScript Program

Create:

```typescript
console.log("Hello TypeScript!");
```

Compile:

```bash
tsc hello.ts
```

Generated:

```javascript
console.log("Hello TypeScript!");
```

Run:

```bash
node hello.js
```

Output:

```text
Hello TypeScript!
```

---

# 4. Primitive Types

## String

Stores text.

```typescript
let username: string = "Asif";
```

### Memory

```text
username
   |
   V
 "Asif"
```

---

### Template Literals

```typescript
let username: string = "Asif";

let message = `Hello ${username}`;
```

Output:

```text
Hello Asif
```

---

## Number

Stores:

* Integer
* Decimal
* Negative

```typescript
let age: number = 28;

let salary: number = 50000.50;

let temp: number = -5;
```

---

## Boolean

Only two values.

```typescript
true
false
```

Example:

```typescript
let isLoggedIn: boolean = true;
```

Real-world:

```typescript
let isPremium: boolean = false;
```

---

# 5. Any Type

Avoid whenever possible.

```typescript
let data: any = 100;

data = "hello";

data = true;
```

No errors.

TypeScript stops helping.

---

### Why Dangerous?

```typescript
let data: any = "Asif";

console.log(data.notExistingMethod());
```

Compiler:

```text
No Error
```

Runtime:

```text
Crash
```

---

# 6. Unknown Type

Safer version of any.

```typescript
let value: unknown = "Hello";
```

Cannot use directly.

Wrong:

```typescript
value.toUpperCase();
```

Error.

---

Correct:

```typescript
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

Output:

```text
HELLO
```

---

## Why Unknown Exists

Example API response:

```typescript
const response: unknown = fetchData();
```

You must verify data before using it.

Safer than `any`.

---

# 7. Object Types

Example:

```typescript
let user: {
    name: string;
    age: number;
    isPremium: boolean;
} = {
    name: "Asif",
    age: 28,
    isPremium: true
};
```

---

## Real World Example

```typescript
let employee = {
    id: 101,
    name: "Asif",
    department: "Engineering",
    salary: 50000
};
```

Used in:

* HR systems
* CRM
* E-commerce
* Banking

---

# 8. let vs const vs var

## var

Old JavaScript.

Avoid.

```typescript
var name = "Asif";
```

Function-scoped.

Creates bugs.

---

## let

Can change value.

```typescript
let score = 0;

score = 10;
```

---

## const

Cannot reassign.

```typescript
const company = "Google";
```

Error:

```typescript
company = "Microsoft";
```

---

## Interview Question

### Which should we use?

Rule:

```text
Use const by default.
Use let only if value changes.
Never use var.
```

---

# 9. Functions

Functions perform tasks.

---

## Basic Function

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

### Breakdown

```typescript
a: number
```

Input must be number.

```typescript
b: number
```

Input must be number.

```typescript
: number
```

Return type.

---

Example:

```typescript
let result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

---

# Arrow Functions

Traditional:

```typescript
function multiply(x: number, y: number): number {
    return x * y;
}
```

Modern:

```typescript
const multiply = (
    x: number,
    y: number
): number => {
    return x * y;
};
```

Output:

```typescript
multiply(5, 4);
```

Result:

```text
20
```

---

# Optional Parameters

Sometimes parameter may not exist.

```typescript
function greet(
    name: string,
    greeting?: string
) {
    return `${greeting || "Hello"} ${name}`;
}
```

---

Examples:

```typescript
greet("Asif");
```

Output:

```text
Hello Asif
```

---

```typescript
greet("Asif", "Welcome");
```

Output:

```text
Welcome Asif
```

---

# Default Parameters

```typescript
function createUser(
    name: string,
    role: string = "user"
) {
    console.log(name, role);
}
```

---

Examples

```typescript
createUser("Asif");
```

Output:

```text
Asif user
```

---

```typescript
createUser("Asif", "admin");
```

Output:

```text
Asif admin
```

---

# Rest Parameters

Suppose we want unlimited numbers.

Without Rest:

```typescript
sum(10,20);
sum(10,20,30);
sum(10,20,30,40);
```

Difficult.

---

With Rest:

```typescript
function sumAll(
    ...numbers: number[]
): number {
    return numbers.reduce(
        (total, num) => total + num,
        0
    );
}
```

---

Call:

```typescript
sumAll(10,20,30,40);
```

Memory:

```text
numbers

[
 10,
 20,
 30,
 40
]
```

---

Reduce Iteration

```text
0 + 10 = 10
10 + 20 = 30
30 + 30 = 60
60 + 40 = 100
```

Result:

```text
100
```

---

# 10. Interface

Blueprint for objects.

```typescript
interface Task {
    id: number;
    title: string;
    completed: boolean;
}
```

Meaning:

Every Task must contain:

```text
id
title
completed
```

---

Example

```typescript
const task: Task = {
    id: 1,
    title: "Learn TypeScript",
    completed: false
};
```

---

# Real Project Example

```typescript
interface Task {
    id: number;
    title: string;
    completed: boolean;
    dueDate?: Date;
}
```

Notice:

```typescript
dueDate?
```

Optional.

---

# Task Creation Function

```typescript
function createTask(
    title: string,
    dueDate?: Date
): Task {

    return {
        id: Math.floor(Math.random() * 10000),
        title,
        completed: false,
        dueDate
    };
}
```

---

Usage

```typescript
const task1 =
createTask("Learn TypeScript");

const task2 =
createTask(
    "Build Todo App",
    new Date("2026-06-20")
);
```

Output:

```json
{
  "id": 1234,
  "title": "Learn TypeScript",
  "completed": false
}
```

---

# 11. Arrays

Collection of values.

```typescript
let numbers: number[] =
[1,2,3,4];
```

---

String Array

```typescript
let names: string[] = [
    "Asif",
    "Rahul",
    "Priya"
];
```

---

Object Array

```typescript
let tasks: Task[] = [
    task1,
    task2
];
```

Most common in APIs.

---

# 12. Tuples

Fixed length.

```typescript
let userInfo:
[string, number, boolean];
```

Example:

```typescript
let userInfo = [
    "Asif",
    28,
    true
];
```

Rules:

```text
1st value = string
2nd value = number
3rd value = boolean
```

Cannot change order.

---

# 13. Readonly Arrays

```typescript
const readonlyTasks:
readonly Task[] = [
    task1,
    task2
];
```

Cannot push.

```typescript
readonlyTasks.push(task3);
```

Error.

Useful for preventing accidental changes.

---

# Real-World Day 1 Mini Project

```typescript
interface User {
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}

const users: User[] = [
    {
        name: "Asif",
        email: "asif@gmail.com",
        age: 28,
        isActive: true
    },
    {
        name: "Rahul",
        email: "rahul@gmail.com",
        age: 30,
        isActive: false
    },
    {
        name: "Priya",
        email: "priya@gmail.com",
        age: 25,
        isActive: true
    }
];

function printActiveUsers(
    users: User[]
): void {

    users.forEach(user => {

        if (user.isActive) {
            console.log(
                `${user.name} (${user.email})`
            );
        }
    });
}

printActiveUsers(users);
```

Output:

```text
Asif (asif@gmail.com)
Priya (priya@gmail.com)
```

---

# Day 1 Summary

Today you learned:

✅ What TypeScript is
✅ Why companies use it
✅ How TypeScript compiles to JavaScript
✅ Project setup
✅ Primitive types
✅ any vs unknown
✅ Objects
✅ let, const, var
✅ Functions
✅ Optional parameters
✅ Default parameters
✅ Rest parameters
✅ Interfaces
✅ Arrays
✅ Tuples
✅ Readonly arrays

### Interview Questions

1. What is TypeScript?
2. How is TypeScript different from JavaScript?
3. What is the difference between `any` and `unknown`?
4. What is a tuple?
5. Difference between `let`, `const`, and `var`?
6. What are optional parameters?
7. What are rest parameters?
8. Why should `strict: true` be enabled?
9. What is an interface?
10. Does TypeScript run directly in the browser?

### Answer to Last Question

**No. TypeScript does not run directly in the browser. It must first be compiled into JavaScript using the TypeScript Compiler (`tsc`).**

This foundation is enough to start reading and writing basic TypeScript code. Day 2 will focus on **Interfaces vs Types, Type Narrowing, Union Types, Enums, and Object Modeling in real applications.** 🚀
