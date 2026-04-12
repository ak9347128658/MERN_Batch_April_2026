# Day 2 — Operators & Operator Precedence in JavaScript

---

## What are Operators?

An **operator** is a special symbol (or keyword) that tells JavaScript to perform a specific action on one or more values. Think of operators as **verbs** — they *do* something. The values they act on are called **operands**.

```js
// Example:
5 + 3
// ↑   ↑   ← these are operands (the values)
//   ↑     ← this is the operator (the action — addition)
```

JavaScript has **six categories** of operators. Here is the complete map:

![Operators Overview Map](../images/day2/operators_overview_map.svg)

---

## Category 1 — Arithmetic Operators

### Definition

Arithmetic operators perform **mathematical calculations** on numbers — addition, subtraction, multiplication, division, and more. These are the same operations you learned in school, plus two extras: **modulus** (`%`) and **exponentiation** (`**`).

| Operator | Name           | Example    | Result |
|----------|----------------|------------|--------|
| `+`      | Addition       | `10 + 3`   | `13`   |
| `-`      | Subtraction    | `10 - 3`   | `7`    |
| `*`      | Multiplication | `10 * 3`   | `30`   |
| `/`      | Division       | `10 / 3`   | `3.33` |
| `%`      | Modulus         | `10 % 3`   | `1`    |
| `**`     | Exponentiation | `2 ** 8`   | `256`  |
| `++`     | Increment      | `n++`      | `n + 1`|
| `--`     | Decrement      | `n--`      | `n - 1`|

> **Modulus (`%`)** gives the *remainder* after division. For example, `10 % 3` means "divide 10 by 3, keep only the remainder" — which is `1`.
>
> **Exponentiation (`**`)** raises a number to a power. `2 ** 10` means "2 multiplied by itself 10 times" — which is `1024`.

### Interactive Simulation

[Click here to open the Arithmetic Operators Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/arithmetic_operators_interactive.html)

Click every operator card — especially `%` (modulus) and `**` (exponent) which are new. Change the numbers and press `=` to see live results. Try `**` with `2` and `10` — you get 1024!

---

## Category 2 — Assignment Operators

### Definition

Assignment operators **store (assign) a value into a variable**. The basic one is `=`, but JavaScript provides **shorthand versions** that combine an arithmetic operation with assignment in a single step.

| Operator | Name                  | Longhand      | Shorthand   | If x = 10 |
|----------|-----------------------|---------------|-------------|-----------|
| `=`      | Assign                | `x = 10`      | `x = 10`    | `10`      |
| `+=`     | Add and assign        | `x = x + 5`  | `x += 5`    | `15`      |
| `-=`     | Subtract and assign   | `x = x - 3`  | `x -= 3`    | `7`       |
| `*=`     | Multiply and assign   | `x = x * 2`  | `x *= 2`    | `20`      |
| `/=`     | Divide and assign     | `x = x / 4`  | `x /= 4`    | `2.5`     |
| `%=`     | Modulus and assign    | `x = x % 4`  | `x %= 4`    | `2`       |

> These shortcuts exist because updating a variable based on its current value is extremely common in programming. Writing `score += 10` is cleaner and less error-prone than `score = score + 10`.

### Interactive Simulation

[Click here to open the Assignment Operators Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/assignment_operators_demo.html)

Click each operator, change the operand, and press **Apply** — watch x update each time. Try doing `+=` five times with 10 — x grows from 10 → 20 → 30 → 40 → 50!

---

## Category 3 — Comparison Operators

### Definition

Comparison operators **compare two values** and always return a **boolean** — either `true` or `false`. These are the foundation of every `if` statement and conditional logic in JavaScript.

| Operator | Name                     | Example       | Result  |
|----------|--------------------------|---------------|---------|
| `===`    | Strict equal (value + type) | `5 === 5`   | `true`  |
| `===`    | Strict equal (type mismatch)| `5 === "5"` | `false` |
| `!==`    | Strict not equal         | `5 !== 10`    | `true`  |
| `>`      | Greater than             | `10 > 5`      | `true`  |
| `<`      | Less than                | `10 < 5`      | `false` |
| `>=`     | Greater than or equal    | `10 >= 10`    | `true`  |
| `<=`     | Less than or equal       | `5 <= 10`     | `true`  |

> **Why `===` instead of `==`?**
> - `===` (strict equality) checks **both value AND type**. `5 === "5"` is `false` because one is a number and the other is a string.
> - `==` (loose equality) only checks value and performs type coercion. `5 == "5"` is `true` — which often leads to bugs.
> - **Always use `===` and `!==`** in your code. This is a best practice followed by professional developers.

### Interactive Simulation

[Click here to open the Comparison Operators Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/comparison_operators_interactive.html)

Click the tricky tests at the bottom — especially `5 === "5"` and `0 === false`. These are where beginners make mistakes every day!

---

## Category 4 — Logical Operators

### Definition

Logical operators **combine multiple conditions** together. Think of them as the words **"AND"**, **"OR"**, and **"NOT"** in English. They are essential for building complex decision-making logic.

| Operator | Name | What it does                              | Example            | Result  |
|----------|------|-------------------------------------------|--------------------|---------|
| `&&`     | AND  | `true` only if **both** sides are true    | `true && true`     | `true`  |
| `&&`     | AND  |                                           | `true && false`    | `false` |
| `\|\|`   | OR   | `true` if **at least one** side is true   | `true \|\| false`  | `true`  |
| `\|\|`   | OR   |                                           | `false \|\| false` | `false` |
| `!`      | NOT  | **Flips** the value to its opposite       | `!true`            | `false` |
| `!`      | NOT  |                                           | `!false`           | `true`  |

> **Real-world analogy:**
> - `&&` (AND) — A door opens only if you have the key **AND** the passcode. Both conditions must be true.
> - `||` (OR) — You can pay with cash **OR** card. Either one works.
> - `!` (NOT) — If `isLoggedIn` is `true`, then `!isLoggedIn` is `false` — the user is NOT logged in.

### Interactive Simulation

[Click here to open the Logical Operators Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/logical_operators_interactive.html)

Toggle the two switches — watch all three results update instantly. Try switching one off and see how `&&` breaks but `||` still works. This is exactly what login and permission checks look like in a real app!

---

## Category 5 — String & Ternary Operators

### Definition

**String operators** let you **join (concatenate) text** together. The `+` operator, when used with strings, glues them side by side. Template literals (backticks) offer a modern, cleaner way to embed variables inside strings.

**The ternary operator** (`? :`) is a **one-line shortcut for if/else**. It takes three parts: a condition, a value if true, and a value if false.

| Operator | Name              | Example                               | Result             |
|----------|-------------------|---------------------------------------|--------------------|
| `+`      | String concatenation | `"Hello" + " " + "World"`         | `"Hello World"`    |
| `` ` ` ``| Template literal   | `` `My name is ${"Alice"}` ``        | `"My name is Alice"`|
| `? :`    | Ternary            | `age >= 18 ? "Adult" : "Minor"`      | `"Adult"` (if age=20)|

```js
// String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;  // "John Doe"

// Template literal (modern way — use backticks)
let greeting = `Hello, ${firstName} ${lastName}!`;  // "Hello, John Doe!"

// Ternary operator (one-line if/else)
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";  // "Adult"
```

> **When to use the ternary operator:** Use it for simple, short conditions where you need to pick between two values. If the logic is complex, stick with a regular `if/else` block for readability.

![String & Ternary Operators](../images/day2/logical_operators_interactive.webp)

### Interactive Simulation

[Click here to open the String & Ternary Operators Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/string_ternary_operators.html)

On the left — type your own words and see how `+` joins them. On the right — change `age` and `min` to see the ternary flip between Adult and Minor. Try all 4 real-world examples at the bottom!

---

## Complete Cheat Sheet — All Operators

```js
// ── ARITHMETIC ──────────────────────────────────
10 + 3    // 13   addition
10 - 3    // 7    subtraction
10 * 3    // 30   multiplication
10 / 3    // 3.33 division
10 % 3    // 1    remainder (modulus)
2  ** 8   // 256  power (2 to the 8th)
let n=5; n++;  // n is now 6   (increment)
let m=5; m--;  // m is now 4   (decrement)

// ── ASSIGNMENT ──────────────────────────────────
let x = 10;   // store 10
x += 5;       // x = x + 5  → 15
x -= 3;       // x = x - 3  → 12
x *= 2;       // x = x * 2  → 24
x /= 4;       // x = x / 4  → 6
x %= 4;       // x = x % 4  → 2

// ── COMPARISON (always returns true/false) ──────
5 === 5       // true   (same value, same type)
5 === "5"     // false  (different type!)
5 !== 10      // true   (they ARE different)
10 > 5        // true
10 < 5        // false
10 >= 10      // true   (equal counts!)
5  <= 10      // true

// ── LOGICAL ─────────────────────────────────────
true && true  // true   (AND — both must be true)
true && false // false
true || false // true   (OR  — one is enough)
false|| false // false
!true         // false  (NOT — flip it)
!false        // true

// ── STRING ──────────────────────────────────────
"Hello" + " " + "World"     // "Hello World"
`My name is ${"Alice"}`     // "My name is Alice"

// ── TERNARY (one-line if/else) ───────────────────
let age = 20;
let label = age >= 18 ? "Adult" : "Minor"; // "Adult"
```

---

## Homework — Operators Practice

Paste this in your browser console (`F12` → Console tab):

```js
let score = 85;

// 1. Arithmetic
console.log(score + 10);  // add bonus → 95
console.log(score % 10);  // last digit → 5

// 2. Assignment shortcut
score += 5;
console.log(score);       // → 90

// 3. Comparison
console.log(score >= 90); // → true
console.log(score === 90);// → true

// 4. Logical
let passed  = score >= 50;
let topMark = score >= 90;
console.log(passed && topMark);  // both true? → true
console.log(passed || topMark);  // either true? → true

// 5. Ternary
let grade = score >= 90 ? "A" : score >= 75 ? "B" : "C";
console.log(grade);  // → "A"
```

---

# Operator Precedence (BODMAS / BIDMAS)

## What is Operator Precedence?

**Operator precedence** determines the **order in which operators are evaluated** when multiple operators appear in a single expression. It is the same concept as **BODMAS / BIDMAS** from school maths.

When JavaScript sees `2 + 3 * 4`, it doesn't just read left to right. It follows a strict priority system — **multiplication runs before addition**, so the answer is `14`, not `20`.

> **Simple rule:** Higher precedence = executes first. When two operators have the **same** precedence, they are evaluated **left to right** (except exponentiation `**` which goes right to left).

Here is the full precedence tower — **higher = runs first**:

![Operator Precedence Tower](../images/day2/operator_precedence_tower.svg)

---

## Part 1 — BODMAS in Action: Step-by-Step Solver

### The BODMAS Rule

| Letter | Stands For      | Operators        | Priority |
|--------|-----------------|------------------|----------|
| **B**  | Brackets        | `( )`            | 1st (highest) |
| **O**  | Orders / Power  | `**`             | 2nd      |
| **D**  | Division        | `/`              | 3rd      |
| **M**  | Multiplication  | `*`, `%`         | 3rd (same as D) |
| **A**  | Addition        | `+`              | 4th      |
| **S**  | Subtraction     | `-`              | 4th (same as A) |

Then in JavaScript, after maths:

| Priority | Category       | Operators           |
|----------|----------------|---------------------|
| 5th      | Comparison     | `>`, `<`, `>=`, `<=`|
| 6th      | Equality       | `===`, `!==`        |
| 7th      | Logical AND    | `&&`                |
| 8th      | Logical OR     | `\|\|`              |
| Last     | Assignment     | `=`, `+=`, `-=` etc.|

### Interactive Simulation

[Click here to open the BODMAS Step-by-Step Solver](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/bodmas_step_solver.html)

Press **Play all** on each expression — watch the steps reveal one by one. Try `2 + 3 * 4` first — most beginners get this wrong thinking the answer is 20!

---

## Part 2 — Common Precedence Mistakes (Animated)

These are the **exact mistakes** every beginner makes in their first week. Knowing them now saves you hours of debugging later!

| Mistake | What beginners think | What actually happens | Why |
|---------|---------------------|----------------------|-----|
| `2 + 3 * 4 = 20` | Left to right | `3 * 4` first → `14` | `*` has higher precedence than `+` |
| `true \|\| false && false = false` | Left to right | `&&` first → `true` | `&&` has higher precedence than `\|\|` |
| `10 > 5 + 4 = true then > 4` | `10 > 5` first | `5 + 4` first → `10 > 9` → `true` | `+` has higher precedence than `>` |

### Interactive Simulation

[Click here to open the Common Mistakes Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/precedence_common_mistakes.html)

Open every card — these are the traps you need to know!

---

## Part 3 — Precedence Quiz

**Guess before you click!** This quiz has 8 questions covering all the tricky cases. The explanation below each answer tells you exactly *why* the answer is what it is.

### Interactive Simulation

[Click here to open the Precedence Quiz](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/precedence_quiz_tester.html)

---

## Part 4 — The BODMAS / Precedence Cheat Card

![Precedence Cheat Card](../images/day2/precedence_cheat_card.webp)

---

## Complete Precedence Summary

```js
// ── BODMAS RULE — same as school maths ─────────────────
// B  → Brackets      ( )          runs 1st
// O  → Orders/Power  **           runs 2nd
// D  → Division      /            runs 3rd (with M)
// M  → Multiplication *  %        runs 3rd
// A  → Addition      +            runs 4th (with S)
// S  → Subtraction   -            runs 4th

// ── THEN in JavaScript: ────────────────────────────────
// Comparison   > < >= <=          runs 5th
// Equality     === !==            runs 6th
// Logical AND  &&                 runs 7th
// Logical OR   ||                 runs 8th
// Assignment   = += -= etc.       runs LAST

// ── EXAMPLES ───────────────────────────────────────────
2 + 3 * 4          // 14  (not 20 — * before +)
(2 + 3) * 4        // 20  (brackets first)
10 - 2 ** 3        // 2   (** before -)
20 / 4 + 3 * 2     // 11  (/ and * before +)
5 + 3 > 2 * 4      // false  (8 > 8 → false)
true || false && false  // true  (&& before ||)
let x = 2 + 3 * 4  // x = 14  (right side first, then =)

// ── GOLDEN RULE ────────────────────────────────────────
// When in doubt — use BRACKETS!
// (2 + 3) * 4   is better than hoping JS does what you think
```

---

## Homework — Predict Before You Run

Predict each answer **before** running it in your console (`F12`):

```js
console.log( 2 + 5 * 3 );              // ? → 17  (* first)
console.log( (2 + 5) * 3 );            // ? → 21  (brackets first)
console.log( 10 - 3 + 2 );             // ? → 9   (left to right)
console.log( 2 ** 2 ** 3 );            // ? → 256 (right to left!)
console.log( 6 / 2 * 3 );              // ? → 9   (left to right)
console.log( 10 > 5 + 4 );             // ? → true (5+4=9, 10>9)
console.log( true || false && false );  // ? → true (&& first)
console.log( !false && true );          // ? → true (! first)
```

---
