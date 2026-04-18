## Day 7 — Built-in Methods & Exception Handling

Hello students! Today we are going to learn something very exciting. JavaScript gives us **ready-made tools** that we can use for strings, numbers, and math. Think of them like tools in a toolbox — you don't need to make a hammer, you just pick it up and use it.

At the end, we will also learn **exception handling** — how to catch errors so our program doesn't crash.

---

### Interactive Simulation

[Click here to open the Built-in Methods Playground](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day7/string_number_builtins.html)

Open this link. You will see 3 tabs with 29 functions. For each one:
1. Read what it does
2. Change the input
3. Click **"Try it live"**
4. Click **"MERN examples"** to see real-world use

---

## Part 1 — Quick Cheat Sheet

Before the deep dive, here's a small table to remember the most important ones.

### Strings (text)

| Method | What it does | Real example |
|---|---|---|
| `trim()` | Removes extra spaces | Clean form input |
| `toUpperCase()` | Makes ALL CAPS | Normalize usernames |
| `includes()` | Checks if word is inside | Search bar |
| `split()` | Breaks string into array | Read CSV file |
| `replace()` | Finds and swaps text | Fix typos |
| `slice()` | Cuts a portion | Blog preview |

### Numbers

| Method | What it does | Real example |
|---|---|---|
| `toFixed(2)` | Keeps only 2 decimals | Show ₹99.50 |
| `parseInt()` | Converts "42px" → 42 | Read CSS value |
| `parseFloat()` | Converts "3.14" → 3.14 | Read price input |
| `isNaN()` | Checks if NOT a number | Validate form |

### Math

| Method | What it does | Real example |
|---|---|---|
| `Math.random()` | Random number 0 to 1 | Generate OTP |
| `Math.floor()` | Rounds DOWN | Page number |
| `Math.max/min()` | Biggest / smallest | Highest marks |
| `Math.abs()` | Removes the minus sign | Distance |

---

## Part 2 — String Methods (Deep Dive)

A **string** is any text inside quotes. Example: `"hello"`, `'MERN'`, `` `stack` ``.

Very important rule: **strings never change themselves.** Every method gives you a NEW string. So you must save it in a variable.

### 2.1 — `trim()` : Remove extra spaces

Imagine a student writes their email as `"   hasan@gmail.com   "` with spaces. We want to clean it.

```js
let email = "   hasan@gmail.com   ";
console.log(email.trim());        // "hasan@gmail.com"
console.log(email.length);        // 21 → original is unchanged
console.log(email.trim().length); // 15 → after cleaning
```

**Why it matters:** Users often type extra spaces by accident. Always clean before saving to the database.

### 2.2 — `toUpperCase()` and `toLowerCase()` : Change the case

```js
let name = "Hasan Khan";
console.log(name.toUpperCase()); // "HASAN KHAN"
console.log(name.toLowerCase()); // "hasan khan"
```

**Classic use — login check (ignore case):**

```js
let input = "HASAN@gmail.com";
let saved = "hasan@gmail.com";

if (input.toLowerCase() === saved.toLowerCase()) {
  console.log("Emails match!");
}
```

### 2.3 — `includes()` : Is this word inside?

Returns `true` or `false`. **Remember: it is case-sensitive.**

```js
let sentence = "I love MERN stack";
console.log(sentence.includes("MERN"));   // true
console.log(sentence.includes("mern"));   // false  — capital M matters
console.log(sentence.includes("Python")); // false
```

**Real use — a search bar:**

```js
let products = ["iPhone 15", "Samsung S24", "iPad Pro"];
let search   = "iphone";

let results = products.filter(
  p => p.toLowerCase().includes(search)
);
console.log(results); // ["iPhone 15"]
```

### 2.4 — `split()` : Break a string into an array

```js
let csv = "apple,banana,mango";
console.log(csv.split(","));  // ["apple", "banana", "mango"]

let sentence = "I love coding";
console.log(sentence.split(" ")); // ["I", "love", "coding"]

let word = "MERN";
console.log(word.split(""));  // ["M", "E", "R", "N"]
```

**Real use — count words in a tweet:**

```js
let tweet = "Learning JavaScript is fun today";
let wordCount = tweet.split(" ").length; // 5
```

### 2.5 — `replace()` and `replaceAll()` : Swap text

- `replace()` changes **only the first** match
- `replaceAll()` changes **every** match

```js
let msg = "I love cats. Cats are cute.";

console.log(msg.replace("cats", "dogs"));
// "I love dogs. Cats are cute."   → only first one changed

console.log(msg.replaceAll("cats", "dogs"));
// "I love dogs. Cats are cute."   → still "Cats" (capital C) stays!
```

**Real use — format a phone number:**

```js
let phone = "98765-43210";
let clean = phone.replaceAll("-", ""); // "9876543210"
```

### 2.6 — `slice()` : Cut a portion

`slice(start, end)` — starts at `start`, stops **before** `end`.

```js
let text = "JavaScript";
//          0123456789
console.log(text.slice(0, 4)); // "Java"
console.log(text.slice(4));    // "Script"
console.log(text.slice(-6));   // "Script"  (last 6 characters)
```

**Real use — blog post preview:**

```js
let post    = "This is a very long blog post about React hooks...";
let preview = post.slice(0, 30) + "...";
```

### 2.7 — Joining strings : `concat()` vs template literals

```js
let first = "Hasan";
let last  = "Khan";

// Old way
console.log(first.concat(" ", last)); // "Hasan Khan"

// Modern way (preferred in MERN!) — uses backticks
console.log(`${first} ${last}`);      // "Hasan Khan"
```

---

## Part 3 — Number Methods (Deep Dive)

In JavaScript, numbers are just numbers — there is no separate int or float. `42`, `3.14`, `-7` are all the same type.

### 3.1 — `toFixed(n)` : Keep n decimal places

**Warning:** `toFixed()` returns a **string**, not a number!

```js
let price = 99.4567;
console.log(price.toFixed(2)); // "99.46"   ← string
console.log(price.toFixed(0)); // "99"
console.log(price.toFixed(4)); // "99.4567"
```

**Real use — displaying prices:**

```js
let total = 1234.5;
console.log(`Total: ₹${total.toFixed(2)}`); // "Total: ₹1234.50"
```

### 3.2 — `parseInt()` : Get the whole number out of a string

It reads digits from the start and **stops** at the first non-digit.

```js
console.log(parseInt("42"));     // 42
console.log(parseInt("42px"));   // 42   → stopped at 'p'
console.log(parseInt("3.9"));    // 3    → cut the decimal (no rounding)
console.log(parseInt("abc42"));  // NaN  → didn't start with a digit
console.log(parseInt("  20  ")); // 20
```

### 3.3 — `parseFloat()` : Same but keeps decimals

```js
console.log(parseFloat("3.14"));    // 3.14
console.log(parseFloat("3.14abc")); // 3.14
console.log(parseFloat("₹99.50"));  // NaN — doesn't start with a digit
```

### 3.4 — `isNaN()` : Is this NOT a number?

Returns `true` if the value is **not** a valid number.

```js
console.log(isNaN(42));      // false
console.log(isNaN("hello")); // true
console.log(isNaN("42"));    // false — it CAN be converted
```

**Real use — validate age:**

```js
function validateAge(input) {
  let age = parseInt(input);
  if (isNaN(age))  return "Please enter a valid number";
  if (age < 0)     return "Age cannot be negative";
  return "Valid!";
}

console.log(validateAge("twenty")); // "Please enter a valid number"
console.log(validateAge("25"));     // "Valid!"
```

### 3.5 — `toString()` : Number to string

```js
let num = 255;
console.log(num.toString());   // "255"
console.log(num.toString(2));  // "11111111"  → binary
console.log(num.toString(16)); // "ff"        → hex
```

---

## Part 4 — Math Object (Deep Dive)

`Math` is a built-in object. You **don't create** it — just use it directly.

### 4.1 — `Math.random()` : Random decimal 0 to 1

Always gives something like `0.7834...`. Never exactly 1.

```js
console.log(Math.random()); // e.g., 0.4821...

// Random number between 1 and 10
let dice = Math.floor(Math.random() * 10) + 1;

// 6-digit OTP
let otp = Math.floor(100000 + Math.random() * 900000);
```

### 4.2 — Rounding : `floor()`, `ceil()`, `round()`

- `Math.floor()` — always goes **DOWN**
- `Math.ceil()`  — always goes **UP**
- `Math.round()` — goes to the **NEAREST**

```js
console.log(Math.floor(4.9)); // 4
console.log(Math.ceil(4.1));  // 5
console.log(Math.round(4.5)); // 5
console.log(Math.round(4.4)); // 4
```

**Real use — pagination:**

```js
let totalItems = 53;
let perPage    = 10;
let pages      = Math.ceil(totalItems / perPage); // 6 pages
```

### 4.3 — `Math.max()` and `Math.min()`

```js
console.log(Math.max(10, 25, 7, 99, 3)); // 99
console.log(Math.min(10, 25, 7, 99, 3)); // 3

// With an array — use the spread operator (...)
let scores = [78, 92, 65, 88, 100];
console.log(Math.max(...scores)); // 100
```

### 4.4 — `Math.abs()` : Remove the minus sign

```js
console.log(Math.abs(-42));  // 42
console.log(Math.abs(-3.7)); // 3.7

// Real use — distance between two points
let a = 10, b = 25;
let distance = Math.abs(a - b); // 15
```

### 4.5 — `Math.pow()` and `Math.sqrt()`

```js
console.log(Math.pow(2, 10)); // 1024
console.log(Math.sqrt(144));  // 12

// Modern way
console.log(2 ** 10);         // 1024
```

---

## Part 5 — Exception Handling

Now listen carefully class — this is very important.

When you write code, sometimes things go wrong:
- The user types letters instead of a number
- The internet is down
- A file is missing
- You try to divide by zero

If we don't handle these, our **entire app will crash**. Exception handling is how we catch these problems gracefully.

### 5.1 — What is an "exception"?

An **exception** (or "error") is JavaScript's way of saying "something went wrong, I can't continue."

Example of a crash:

```js
let data = null;
console.log(data.name);
// TypeError: Cannot read properties of null
// → The whole program stops here!
```

### 5.2 — The `try...catch` block

This is the main tool for handling errors. Think of it like this:

> "TRY to do this. If something breaks, CATCH the error and handle it."

**Syntax:**

```js
try {
  // risky code here
} catch (error) {
  // runs only if something goes wrong
}
```

**Simple example:**

```js
try {
  let data = null;
  console.log(data.name);       // this will fail
  console.log("This never runs");
} catch (error) {
  console.log("Oops! Something went wrong.");
  console.log("Reason:", error.message);
}

console.log("Program continues normally ✓");
```

**Output:**
```
Oops! Something went wrong.
Reason: Cannot read properties of null (reading 'name')
Program continues normally ✓
```

See? The program did NOT crash. It kept running.

### 5.3 — The `throw` statement : Create your own error

You can make your own errors on purpose. This is useful for validation.

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // 5
  console.log(divide(10, 0)); // throws an error
} catch (error) {
  console.log("Error caught:", error.message);
}
```

### 5.4 — The `finally` block

`finally` runs **no matter what** — whether there was an error or not. Good for cleanup.

```js
try {
  console.log("Trying...");
  throw new Error("Something broke");
} catch (error) {
  console.log("Caught:", error.message);
} finally {
  console.log("This always runs — cleanup!");
}
```

**Output:**
```
Trying...
Caught: Something broke
This always runs — cleanup!
```

### 5.5 — Real MERN example : validate user input

Here we combine **everything we learned today**:

```js
function registerUser(rawName, rawAge) {
  try {
    // Clean the input
    let name = rawName.trim();
    let age  = parseInt(rawAge.trim());

    // Validate
    if (name === "") {
      throw new Error("Name cannot be empty");
    }
    if (isNaN(age)) {
      throw new Error("Age must be a number");
    }
    if (age < 18) {
      throw new Error("You must be at least 18");
    }

    // All good!
    return `✓ Registered: ${name.toUpperCase()}, age ${age}`;

  } catch (error) {
    return `✗ Failed: ${error.message}`;
  }
}

console.log(registerUser("  Hasan  ", "25"));     // ✓ Registered: HASAN, age 25
console.log(registerUser("", "25"));              // ✗ Failed: Name cannot be empty
console.log(registerUser("Ali", "abc"));          // ✗ Failed: Age must be a number
console.log(registerUser("Ali", "15"));           // ✗ Failed: You must be at least 18
```

### 5.6 — Common error types

JavaScript has several built-in error types. You will see these a lot:

| Error | When it happens |
|---|---|
| `ReferenceError` | Variable is not defined |
| `TypeError` | Calling something that is not a function, or reading from `null` |
| `SyntaxError` | You wrote invalid JavaScript |
| `RangeError` | Number is out of allowed range |

```js
try {
  console.log(xyz); // xyz was never defined
} catch (error) {
  console.log(error.name);    // "ReferenceError"
  console.log(error.message); // "xyz is not defined"
}
```

---

## Part 6 — Final Big Example

Here is a real e-commerce function that uses **everything** we learned today: strings, numbers, math, and exception handling.

```js
function processOrder(rawPrice, rawQuantity, discountCode) {
  try {
    // 1. Clean string inputs
    let price    = parseFloat(rawPrice.trim());
    let quantity = parseInt(rawQuantity.trim());
    let code     = discountCode.trim().toUpperCase();

    // 2. Validate
    if (isNaN(price) || isNaN(quantity)) {
      throw new Error("Invalid price or quantity");
    }
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    // 3. Calculate subtotal
    let subtotal = price * quantity;

    // 4. Apply discount
    let discount = 0;
    if (code.includes("SAVE")) {
      discount = subtotal * 0.10;
    }

    // 5. Round the final amount
    let total = (subtotal - discount).toFixed(2);

    // 6. Random order ID
    let orderId = "ORD" + Math.floor(Math.random() * 100000);

    return {
      orderId: orderId,
      total:   `₹${total}`,
      saved:   `₹${discount.toFixed(2)}`
    };

  } catch (error) {
    return { error: error.message };
  }
}

console.log(processOrder("  499.50  ", "3", "save20"));
// { orderId: "ORD48213", total: "₹1348.65", saved: "₹149.85" }

console.log(processOrder("abc", "3", "save20"));
// { error: "Invalid price or quantity" }
```

Look carefully — we used **10+ built-in methods** together: `trim()`, `parseFloat()`, `parseInt()`, `toUpperCase()`, `isNaN()`, `includes()`, `toFixed()`, `Math.floor()`, `Math.random()`, `throw`, and `try...catch`. This is exactly how real MERN code looks.

---

## Part 7 — Rules to Remember (Write these in your notebook!)

1. **Strings never change themselves** — always save the result: `name = name.trim();`
2. **`toFixed()` returns a STRING**, not a number.
3. **`Math` has no parentheses** — write `Math.random()`, never `Math().random()`.
4. **`parseInt("3.9")` gives `3`**, not `4` — it cuts, it does not round.
5. **Always use `isNaN()`** before trusting user input as a number.
6. **Always wrap risky code in `try...catch`** — especially form input, API calls, JSON parsing.
7. **Use `throw new Error("message")`** to create your own clear error messages.
8. **`finally` always runs** — even if an error happens. Use it for cleanup.

---

**Homework:**
- Open the simulation link and try all 29 functions.
- Write your own `registerUser()` function and test it with good and bad inputs.
- Try to break your code on purpose and catch the error with `try...catch`.

See you tomorrow!
