## **Operators** 
First, the complete map:Six categories. We'll go through each one with live examples and animations. Let's start!

![alt](../images/day2/operators_overview_map.svg)
---

## Category 1 — Arithmetic Operators

These do **maths** — the ones you already know from school, plus two special ones

[Click link to open Simulation for arithmetic_operators_interactive](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/arithmetic_operators_interactive.html)

Click every operator card — especially `%` (modulus) and `**` (exponent) which are new. Change the numbers and press `=` to see live results. Try `**` with `2` and `10` — you get 1024!

---

## Category 2 — Assignment Operators

These **store values into variables**. You know `=` already — now meet its shortcuts:Click each operator, change the operand, and press **Apply** — watch x update each time. Try doing `+=` five times with 10 — x grows from 10 → 20 → 30 → 40 → 50!

[Click link to open Simulation for Assignment Operators](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/assignment_operators_demo.html)


---

## Category 3 — Comparison Operators

These **compare two values** and always return `true` or `false`. This is what powers every `if` statement:Click the tricky tests at the bottom — especially `5 === "5"` and `0 === false`. These are where beginners make mistakes every day!


[Click link to open Simulation for omparison Operators](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/comparison_operators_interactive.html)

---

## Category 4 — Logical Operators

These combine **multiple conditions** together. Think of them as the words **"AND"**, **"OR"**, and **"NOT"** in English:Toggle the two switches — watch all three results update instantly. Try switching one off and see how `&&` breaks but `||` still works. This is exactly what login and permission checks look like in a real app!

[Click link to open Simulation for Logical Operators](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/logical_operators_interactive.html)

---

## Category 5 — String & Ternary OperatorsOn the left — type your own words and see how `+` joins them. On the right — change `age` and `min` to see the ternary flip between Adult and Minor. Try all 4 real-world examples at the bottom!

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

**Homework — paste this in your console (F12):**

```js
let score = 85;

// 1. Arithmetic
console.log(score + 10);  // add bonus
console.log(score % 10);  // last digit

// 2. Assignment shortcut
score += 5;
console.log(score);       // 90

// 3. Comparison
console.log(score >= 90); // true or false?
console.log(score === 90);

// 4. Logical
let passed  = score >= 50;
let topMark = score >= 90;
console.log(passed && topMark);  // both?
console.log(passed || topMark);  // either?

// 5. Ternary
let grade = score >= 90 ? "A" : score >= 75 ? "B" : "C";
console.log(grade);
```
