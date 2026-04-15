JavaScript has tons of built-in functions for strings and numbers that you'll use every single day. Let me build you a full interactive reference playground:

### Interactive Simulation

[Click here to open the Arithmetic Operators Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day7/string_number_builtins.html)

This is your complete reference — 3 tabs, 29 functions total. For each one:
- Read the description
- Change the input values
- Click "Try it live" to see the result instantly
- Click "MERN examples" to see how it's used in real projects

---

Here's a quick cheat sheet to remember the most important ones:

**String — daily use:**

| Method | What it does | Real use case |
|---|---|---|
| `trim()` | Remove spaces | Clean form input |
| `toUpperCase()` | ALL CAPS | Normalize usernames |
| `includes()` | Search inside | Search feature |
| `split()` | String → array | Parse CSV data |
| `replace()` | Find and swap | Fix typos, format text |
| `slice()` | Cut a portion | Show preview text |

**Number — daily use:**

| Method | What it does | Real use case |
|---|---|---|
| `toFixed(2)` | Round to 2 decimals | Show prices like ₹99.50 |
| `parseInt()` | "42px" → 42 | Read CSS/HTML values |
| `parseFloat()` | "3.14" → 3.14 | Read decimal inputs |
| `isNaN()` | Check if invalid | Validate user input |

**Math — daily use:**

| Method | What it does | Real use case |
|---|---|---|
| `Math.random()` | Random 0–1 | Generate OTPs, shuffle |
| `Math.floor()` | Round down | Page numbers, indexes |
| `Math.max/min()` | Biggest/smallest | Find highest score |
| `Math.abs()` | Remove minus sign | Distance, difference |

A real pattern you'll write in your MERN app very soon — combining several of these together:

```js
// Clean and validate a user's age input from a form
let rawInput = "  25  ";

let cleaned = rawInput.trim();           // "25"
let age     = parseInt(cleaned);         // 25

if (isNaN(age) || age < 0 || age > 120) {
  throw new Error("Invalid age!");        // exception handling!
}

console.log("Valid age:", age.toFixed(0)); // "25"
```

See how `trim()`, `parseInt()`, `isNaN()`, and `toFixed()` all work together — plus exception handling from our last lesson!

---

## Deep Dive — Definitions & Examples

Think of built-in methods as **ready-made tools**. You don't build a hammer from scratch — you just pick it up and use it. Same here: JavaScript gives you these tools for free.

### 1. String Methods Explained

A **string** is any text wrapped in quotes: `"hello"`, `'MERN'`, `` `stack` ``. Strings are **immutable** — methods never change the original, they return a NEW string. Always save the result!

#### `trim()` — Remove whitespace from both ends

**Definition:** Deletes spaces, tabs, and newlines from the start and end of a string (not the middle).

```js
let email = "   hasan@gmail.com   ";
console.log(email.trim());        // "hasan@gmail.com"
console.log(email.length);        // 21 (original unchanged!)
console.log(email.trim().length); // 15

// Real MERN use — cleaning form data before saving to MongoDB
let username = "  ak2311  ".trim(); // "ak2311"
```

#### `toUpperCase()` / `toLowerCase()` — Change letter case

**Definition:** Converts every letter to CAPITAL or small letters. Numbers and symbols are ignored.

```js
let name = "Hasan Khan";
console.log(name.toUpperCase()); // "HASAN KHAN"
console.log(name.toLowerCase()); // "hasan khan"

// Case-insensitive comparison (a classic login check)
let input = "HASAN@gmail.com";
let saved = "hasan@gmail.com";
if (input.toLowerCase() === saved.toLowerCase()) {
  console.log("Emails match!");
}
```

#### `includes()` — Check if text exists inside

**Definition:** Returns `true` if the substring is found, `false` if not. Case-sensitive.

```js
let sentence = "I love MERN stack";
console.log(sentence.includes("MERN"));   // true
console.log(sentence.includes("mern"));   // false  (case matters!)
console.log(sentence.includes("Python")); // false

// Real use — filter a search
let products = ["iPhone 15", "Samsung S24", "iPad Pro"];
let search = "iphone";
let results = products.filter(p => p.toLowerCase().includes(search));
console.log(results); // ["iPhone 15"]
```

#### `split()` — Break string into array

**Definition:** Cuts a string at every separator you give it, returning an array of pieces.

```js
let csv = "apple,banana,mango";
console.log(csv.split(","));    // ["apple", "banana", "mango"]

let sentence = "I love coding";
console.log(sentence.split(" ")); // ["I", "love", "coding"]

let word = "MERN";
console.log(word.split(""));    // ["M", "E", "R", "N"]  (every character)

// Real use — count words in a tweet
let tweet = "Learning JavaScript is fun today";
let wordCount = tweet.split(" ").length; // 5
```

#### `replace()` / `replaceAll()` — Swap text

**Definition:** `replace()` changes the FIRST match. `replaceAll()` changes EVERY match.

```js
let msg = "I love cats. Cats are cute.";
console.log(msg.replace("cats", "dogs"));
// "I love dogs. Cats are cute."  (only first one!)

console.log(msg.replaceAll("cats", "dogs"));
// Error! Case-sensitive — "Cats" with capital C not replaced

// Real use — censor bad words or format phone numbers
let phone = "98765-43210";
let clean = phone.replaceAll("-", ""); // "9876543210"
```

#### `slice()` — Extract a portion

**Definition:** `slice(start, end)` cuts a piece from index `start` up to (but not including) `end`. Supports negative numbers to count from the end.

```js
let text = "JavaScript";
//          0123456789
console.log(text.slice(0, 4));  // "Java"
console.log(text.slice(4));     // "Script"  (till the end)
console.log(text.slice(-6));    // "Script"  (last 6 chars)

// Real use — blog post preview
let post = "This is a very long blog post about React hooks and state management...";
let preview = post.slice(0, 30) + "..."; // "This is a very long blog post..."
```

#### Bonus: `concat()` and template literals

```js
let first = "Hasan";
let last = "Khan";

// Old way
console.log(first.concat(" ", last)); // "Hasan Khan"

// Modern way (template literal) — preferred in MERN!
console.log(`${first} ${last}`);      // "Hasan Khan"
```

---

### 2. Number Methods Explained

A **number** in JS is any numeric value: `42`, `3.14`, `-7`, `0`. Unlike many languages, JS has only ONE number type — no separate "int" or "float".

#### `toFixed(n)` — Round to n decimal places

**Definition:** Returns a **string** rounded to `n` decimal places. Note: it's a string, not a number!

```js
let price = 99.4567;
console.log(price.toFixed(2)); // "99.46"  (string!)
console.log(price.toFixed(0)); // "99"
console.log(price.toFixed(4)); // "99.4567"

// Real use — showing prices with ₹ symbol
let total = 1234.5;
console.log(`Total: ₹${total.toFixed(2)}`); // "Total: ₹1234.50"
```

#### `parseInt()` — Extract whole number from string

**Definition:** Reads the string from the start and grabs digits until it hits a non-digit. Ignores decimals.

```js
console.log(parseInt("42"));        // 42
console.log(parseInt("42px"));      // 42     (stops at 'p')
console.log(parseInt("3.9"));       // 3      (no rounding — just cuts!)
console.log(parseInt("abc42"));     // NaN    (didn't start with digit)
console.log(parseInt("  20  "));    // 20     (ignores leading space)

// Real use — read CSS pixel values
let width = "1920px";
let pixels = parseInt(width); // 1920
```

#### `parseFloat()` — Extract decimal number from string

**Definition:** Same as `parseInt()` but keeps decimals.

```js
console.log(parseFloat("3.14"));     // 3.14
console.log(parseFloat("3.14abc"));  // 3.14
console.log(parseFloat("₹99.50"));   // NaN  (doesn't start with digit)

// Real use — read price from a form input
let input = "499.99";
let amount = parseFloat(input); // 499.99
```

#### `isNaN()` — Check if value is "Not a Number"

**Definition:** Returns `true` if the value is NOT a valid number. Very useful for validation.

```js
console.log(isNaN(42));       // false  (it IS a number)
console.log(isNaN("hello"));  // true   (not a number)
console.log(isNaN("42"));     // false  (can be converted!)
console.log(isNaN(parseInt("abc"))); // true

// Real use — form validation
function validateAge(input) {
  let age = parseInt(input);
  if (isNaN(age)) return "Please enter a valid number";
  if (age < 0) return "Age cannot be negative";
  return "Valid!";
}
console.log(validateAge("twenty"));  // "Please enter a valid number"
console.log(validateAge("25"));      // "Valid!"
```

#### `toString()` — Convert number to string

```js
let num = 255;
console.log(num.toString());    // "255"
console.log(num.toString(2));   // "11111111"  (binary!)
console.log(num.toString(16));  // "ff"        (hexadecimal!)
```

---

### 3. Math Object Explained

`Math` is a **built-in object** with helpful math utilities. You don't create it — just use it directly: `Math.something()`.

#### `Math.random()` — Random decimal between 0 and 1

**Definition:** Returns a random number like `0.7834...`. Always less than 1, never exactly 1.

```js
console.log(Math.random()); // e.g., 0.4821...

// Random number between 1 and 10
let dice = Math.floor(Math.random() * 10) + 1;

// Generate a 6-digit OTP
let otp = Math.floor(100000 + Math.random() * 900000);
console.log(otp); // e.g., 482913
```

#### `Math.floor()` / `Math.ceil()` / `Math.round()` — Rounding

**Definitions:**
- `floor()` — always rounds DOWN  (3.9 → 3)
- `ceil()`  — always rounds UP    (3.1 → 4)
- `round()` — rounds to NEAREST   (3.5 → 4, 3.4 → 3)

```js
console.log(Math.floor(4.9));  // 4
console.log(Math.ceil(4.1));   // 5
console.log(Math.round(4.5));  // 5
console.log(Math.round(4.4));  // 4

// Real use — pagination
let totalItems = 53;
let perPage = 10;
let pages = Math.ceil(totalItems / perPage); // 6 pages (can't have 5.3!)
```

#### `Math.max()` / `Math.min()` — Biggest and smallest

```js
console.log(Math.max(10, 25, 7, 99, 3)); // 99
console.log(Math.min(10, 25, 7, 99, 3)); // 3

// With an array — use spread operator
let scores = [78, 92, 65, 88, 100];
console.log(Math.max(...scores)); // 100
console.log(Math.min(...scores)); // 65
```

#### `Math.abs()` — Absolute value (remove minus)

```js
console.log(Math.abs(-42));  // 42
console.log(Math.abs(42));   // 42
console.log(Math.abs(-3.7)); // 3.7

// Real use — distance between two points
let a = 10, b = 25;
let distance = Math.abs(a - b); // 15
```

#### `Math.pow()` and `Math.sqrt()` — Power and square root

```js
console.log(Math.pow(2, 10));  // 1024  (2 to the power 10)
console.log(Math.sqrt(144));   // 12
console.log(Math.sqrt(2));     // 1.414...

// Modern way for power — exponent operator
console.log(2 ** 10); // 1024
```

---

### 4. Putting It All Together — A Realistic MERN Example

Here's a function you might actually write in your e-commerce app:

```js
function processOrder(rawPrice, rawQuantity, discountCode) {
  // 1. Clean up string inputs
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
    discount = subtotal * 0.10; // 10% off
  }

  // 5. Final amount — round to 2 decimals
  let total = (subtotal - discount).toFixed(2);

  // 6. Generate order ID
  let orderId = "ORD" + Math.floor(Math.random() * 100000);

  return {
    orderId: orderId,
    total: `₹${total}`,
    saved: `₹${discount.toFixed(2)}`
  };
}

console.log(processOrder("  499.50  ", "3", "save20"));
// { orderId: "ORD48213", total: "₹1348.65", saved: "₹149.85" }
```

Notice how **10+ built-in methods** come together: `trim()`, `parseFloat()`, `parseInt()`, `toUpperCase()`, `isNaN()`, `includes()`, `toFixed()`, `Math.floor()`, `Math.random()`, plus template literals. This is real MERN-style code!

---

### Quick Rules to Remember

1. **Strings are immutable** — methods return NEW strings, save the result.
2. **`toFixed()` returns a string**, not a number — convert back with `parseFloat()` if needed.
3. **`Math` has no parentheses after it** — it's an object: `Math.random()`, not `Math().random()`.
4. **`parseInt("3.9")` gives `3`**, not `4` — it doesn't round, it truncates.
5. **Always validate with `isNaN()`** before using user input as a number.