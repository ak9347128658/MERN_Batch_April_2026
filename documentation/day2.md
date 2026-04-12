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

## Category 5 — String & Ternary Operators On the left — type your own words and see how `+` joins them. On the right — change `age` and `min` to see the ternary flip between Adult and Minor. Try all 4 real-world examples at the bottom!

![alt](../images/day2/logical_operators_interactive.webp)

[Click link to open Simulation for String & Ternary Operators](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/string_ternary_operators.html)


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

=================================
#  **Operator Precedence** — also called **BODMAS / BIDMAS** in school maths. In JavaScript it's the same idea: when there are multiple operators in one line, JavaScript follows a strict **order of who goes first**.

Let's start with the full picture:The tower is the rule — **higher = runs first**. Brackets always win. Assignment always goes last. Now let's see this in action with animated step-by-step solving.

![alt](../images/day2/operator_precedence_tower.svg)

---

## Part 1 — BODMAS in action: step-by-step solverPress **Play all** on each expression — watch the steps reveal one by one. Try `2 + 3 * 4` first — most beginners get this wrong thinking the answer is 20!

[Click link to open Simulation for BODMAS](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/bodmas_step_solver.html)

---

## Part 2 — The most common mistakes (animated)Open every card — these are the **exact mistakes** every beginner makes in their first week. Knowing them now saves you hours of debugging later!

[Click link to open Simulation for BODMAS](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/precedence_common_mistakes.html)

---

## Part 3 — Live expression tester: guess before you run**Guess before you click!** This quiz has 8 questions covering all the tricky cases. The explanation below each answer tells you exactly *why* the answer is what it is.

[Click link to open Simulation for BODMAS](https://ak9347128658.github.io/MERN_Batch_April_2026/day2/precedence_quiz_tester.html)

---

## Part 4 — The BODMAS / Precedence Cheat Card---

![alt](../images/day2/precedence_cheat_card.webp)

## The Complete Summary

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

**Homework — predict the answer BEFORE running each one in your console:**

```js
// Predict each answer, THEN run it in console (F12)

console.log( 2 + 5 * 3 );         // ?
console.log( (2 + 5) * 3 );       // ?
console.log( 10 - 3 + 2 );        // ?
console.log( 2 ** 2 ** 3 );       // ? (hint: right to left!)
console.log( 6 / 2 * 3 );         // ?
console.log( 10 > 5 + 4 );        // ?
console.log( true || false && false ); // ?
console.log( !false && true );     // ?
```

---

