## Control Statements

![alt](../images/day3/control_statements_revision_map.svg)

Control statements determine the **order in which instructions execute** in a program. Instead of running every line top-to-bottom, control statements let you **make decisions**, **repeat actions**, and **jump** to different parts of your code.

They fall into three categories:

| Category | Purpose | Statements |
|---|---|---|
| **Conditional** | Choose which block runs | `if/else`, `switch`, ternary (`? :`) |
| **Loop** | Repeat a block | `for`, `while`, `do...while`, `for...of`, `forEach` |
| **Jump** | Alter loop/function flow | `break`, `continue`, `return` |

---

## Part 1 — Conditional Statements

### What are Conditional Statements?

Conditional statements let your program **make decisions**. They evaluate a condition (an expression that is either `true` or `false`) and execute different blocks of code depending on the result.

> **Real-world analogy:** "If it's raining, take an umbrella; otherwise, wear sunglasses." — your brain runs conditional logic every day.

---

### 1.1 `if / else if / else`

The most flexible conditional. It checks conditions **in order** — the first one that is `true` runs, and the rest are skipped.

**Syntax:**

```js
if (condition1) {
  // runs when condition1 is true
} else if (condition2) {
  // runs when condition1 is false AND condition2 is true
} else {
  // runs when ALL conditions above are false
}
```

**Key Rules:**

- `if` is **required**; `else if` and `else` are optional.
- Only **one** block executes — the first match wins.
- The condition must evaluate to a **truthy** or **falsy** value.

**Example:**

```js
let score = 82;

if (score >= 90)      { console.log("Grade: A"); }
else if (score >= 75) { console.log("Grade: B"); }
else if (score >= 60) { console.log("Grade: C"); }
else                  { console.log("Grade: F"); }

// Output: Grade: B
```

---

### 1.2 `switch`

Best for matching a **single variable** against **multiple exact values**. Cleaner than many `if/else if` chains when comparing one value.

**Syntax:**

```js
switch (expression) {
  case value1:
    // code
    break;
  case value2:
    // code
    break;
  default:
    // code if no case matches
}
```

**Key Rules:**

- Uses **strict equality** (`===`) — no type coercion.
- `break` is required to stop fall-through (without it, execution continues into the next case).
- `default` is optional but recommended.

**Example:**

```js
let day = "Saturday";

switch (day) {
  case "Monday":  console.log("Start of work week"); break;
  case "Friday":  console.log("TGIF!");              break;
  case "Saturday":
  case "Sunday":  console.log("Weekend!");            break;  // shared case
  default:        console.log("Midweek day");
}

// Output: Weekend!
```

---

### 1.3 Ternary Operator (`? :`)

A **one-line shorthand** for a simple `if/else`. It is an **expression** (returns a value), not a statement.

**Syntax:**

```js
let result = condition ? valueIfTrue : valueIfFalse;
```

**Key Rules:**

- Use for **simple** assignments or returns only.
- Avoid nesting ternaries — it hurts readability.

**Example:**

```js
let age = 20;
let label = age >= 18 ? "Adult" : "Minor";
console.log(label);  // "Adult"
```

---

### Example Questions — Conditional Statements

**Q1.** What will the following code print?

```js
let x = 10;
if (x > 15) {
  console.log("A");
} else if (x > 5) {
  console.log("B");
} else {
  console.log("C");
}
```

**Solution:** Output is `B`. The first condition `x > 15` is false (10 is not > 15). The second condition `x > 5` is true (10 > 5), so `"B"` prints. The `else` is skipped.

---

**Q2.** What happens if you forget `break` in a switch?

```js
let fruit = "apple";
switch (fruit) {
  case "apple":  console.log("Apple");
  case "banana": console.log("Banana");
  case "cherry": console.log("Cherry");
  default:       console.log("Unknown");
}
```

**Solution:** Output is:

```
Apple
Banana
Cherry
Unknown
```

Without `break`, execution **falls through** every case after the match. This is a common bug.

---

**Q3.** Convert this `if/else` to a ternary:

```js
let temp = 35;
let weather;
if (temp > 30) {
  weather = "Hot";
} else {
  weather = "Cool";
}
```

**Solution:**

```js
let temp = 35;
let weather = temp > 30 ? "Hot" : "Cool";
console.log(weather);  // "Hot"
```

---

<a href="https://ak9347128658.github.io/MERN_Batch_April_2026/day3/conditional_mega_lab.html" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-weight:bold;font-size:16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 15px rgba(102,126,234,0.4);">🚀 Click to Open Simulation — Conditional Statements</a>

---

## Part 2 — Loops

### What are Loops?

Loops let you **repeat a block of code** multiple times without writing it over and over. They keep running as long as a specified condition remains `true`.

> **Real-world analogy:** "Keep stirring the soup until it boils." — you repeat the action (stirring) until a condition (boiling) is met.

---

### 2.1 `for` Loop

Use when you **know how many times** to repeat.

**Syntax:**

```js
for (initialization; condition; update) {
  // code to repeat
}
```

**Three parts:**

1. **Initialization** — runs once before the loop starts (`let i = 0`)
2. **Condition** — checked before each iteration; loop stops when `false`
3. **Update** — runs after each iteration (`i++`)

**Example:**

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0 1 2 3 4
```

---

### 2.2 `while` Loop

Use when you **don't know** the exact number of iterations — you only have a condition.

**Syntax:**

```js
while (condition) {
  // code to repeat
}
```

**Key Rule:** If the condition is `false` from the start, the body **never runs**.

**Example:**

```js
let n = 10;
while (n > 0) {
  console.log(n);
  n -= 3;
}
// Output: 10 7 4 1
```

---

### 2.3 `do...while` Loop

Same as `while`, but the body runs **at least once** because the condition is checked **after** the first execution.

**Syntax:**

```js
do {
  // code to repeat
} while (condition);
```

**Key Difference from `while`:**

| | `while` | `do...while` |
|---|---|---|
| **Checks condition** | Before the body | After the body |
| **Minimum runs** | 0 | 1 |

**Example:**

```js
let count = 0;
do {
  console.log("Runs!");  // prints once even though condition is false
} while (count > 10);

// Output: Runs!
```

---

### 2.4 `forEach` — Array Loop

A method on arrays that calls a function **once for each element**.

**Syntax:**

```js
array.forEach((element, index) => {
  // code
});
```

**Key Rules:**

- Cannot use `break` or `continue` inside `forEach`.
- Does not return a new array (use `map` for that).

**Example:**

```js
["Alice", "Bob", "Charlie"].forEach((name, i) => {
  console.log(i + ": " + name);
});
// Output:
// 0: Alice
// 1: Bob
// 2: Charlie
```

---

### 2.5 `for...of` — Cleaner Array Loop

A modern loop that iterates over **iterable values** (arrays, strings, etc.).

**Syntax:**

```js
for (let element of iterable) {
  // code
}
```

**Advantage over `forEach`:** You **can** use `break` and `continue`.

**Example:**

```js
for (let name of ["Alice", "Bob"]) {
  console.log(name);
}
// Output:
// Alice
// Bob
```

---

### Example Questions — Loops

**Q1.** What will this `for` loop output?

```js
for (let i = 1; i <= 5; i++) {
  console.log(i * 2);
}
```

**Solution:** Output is `2 4 6 8 10`. The loop runs with `i` values 1 through 5, and prints `i * 2` each time.

---

**Q2.** What is the difference between these two?

```js
// Version A
let x = 100;
while (x < 5) {
  console.log(x);
}

// Version B
let y = 100;
do {
  console.log(y);
} while (y < 5);
```

**Solution:**
- **Version A** prints **nothing** — the condition `100 < 5` is false, so the body never runs.
- **Version B** prints `100` **once** — the body runs first, then the condition is checked and found false.

This is the fundamental difference: `do...while` always executes at least once.

---

**Q3.** Write a `while` loop that prints all even numbers from 2 to 20.

**Solution:**

```js
let num = 2;
while (num <= 20) {
  console.log(num);
  num += 2;
}
// Output: 2 4 6 8 10 12 14 16 18 20
```

---

<a href="https://ak9347128658.github.io/MERN_Batch_April_2026/day3/all_loops_animated_comparison.html" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#f093fb,#f5576c);color:#fff;font-weight:bold;font-size:16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 15px rgba(245,87,108,0.4);">🔄 Click to Open Simulation — All Loop Types</a>

---

## Part 3 — Jump Statements (`break`, `continue`, `return`)

### What are Jump Statements?

Jump statements **alter the normal flow** of loops and functions. They let you exit early, skip iterations, or return values from functions.

---

### 3.1 `break`

**Stops the loop immediately** and moves to the code after the loop.

**Use case:** You found what you were looking for — no need to keep looping.

**Example:**

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;  // stops the loop at 5
  console.log(i);
}
// Output: 0 1 2 3 4
```

---

### 3.2 `continue`

**Skips the current iteration** and moves to the next one. The loop itself keeps running.

**Use case:** You want to ignore certain values but process the rest.

**Example:**

```js
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue;  // skip even numbers
  console.log(i);
}
// Output: 1 3 5
```

---

### 3.3 `return`

**Exits the entire function** and optionally sends a value back to the caller. Only works inside functions.

**Use case:** You have your answer — no need to run the remaining function code.

**Example:**

```js
function findFirst(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;  // exits the function
  }
  return -1;  // not found
}

console.log(findFirst([10, 20, 30], 20));  // 1
console.log(findFirst([10, 20, 30], 99));  // -1
```

---

### Quick Comparison

| Statement | Scope | Effect |
|---|---|---|
| `break` | Loop / switch | Exits the loop entirely |
| `continue` | Loop | Skips to the next iteration |
| `return` | Function | Exits the function, returns a value |

---

### Example Questions — Jump Statements

**Q1.** What does this code print?

```js
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue;
  if (i === 7) break;
  console.log(i);
}
```

**Solution:** Output is `1 2 4 5 6`.
- When `i === 3`, `continue` skips it (so 3 is not printed).
- When `i === 7`, `break` stops the loop (7 and beyond are not printed).

---

**Q2.** What does this function return?

```js
function check(n) {
  if (n > 100) return "big";
  if (n > 50)  return "medium";
  return "small";
}

console.log(check(75));
```

**Solution:** Output is `"medium"`. The first condition `75 > 100` is false. The second condition `75 > 50` is true, so `"medium"` is returned and the function exits. The last `return "small"` never runs.

---

**Q3.** Use `break` to find the first number divisible by both 3 and 5 between 1 and 100.

**Solution:**

```js
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("Found:", i);
    break;
  }
}
// Output: Found: 15
```

---

<a href="https://ak9347128658.github.io/MERN_Batch_April_2026/day3/break_continue_return_animated.html" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#4facfe,#00f2fe);color:#fff;font-weight:bold;font-size:16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 15px rgba(79,172,254,0.4);">⚡ Click to Open Simulation — break, continue, return</a>

---

## Part 4 — Revision Quiz

Test your understanding of all control statements. Read the explanation after each answer — they reveal the tricky details!

<a href="https://ak9347128658.github.io/MERN_Batch_April_2026/day3/control_statements_quiz.html" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#43e97b,#38f9d7);color:#fff;font-weight:bold;font-size:16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 15px rgba(67,233,123,0.4);">📝 Click to Open Simulation — Revision Quiz</a>

---

## Complete Revision Cheat Sheet

```js
// ═══════════════════════════════════════════
//  CONDITIONAL STATEMENTS
// ═══════════════════════════════════════════

// 1. if / else if / else
if (score >= 90)      { console.log("A"); }
else if (score >= 75) { console.log("B"); }
else if (score >= 60) { console.log("C"); }
else                  { console.log("F"); }

// 2. switch — best for exact value matching
switch (day) {
  case "Monday":  console.log("Start!"); break;
  case "Friday":  console.log("TGIF!");  break;
  case "Saturday":
  case "Sunday":  console.log("Weekend!"); break;   // shared case
  default:        console.log("Weekday");
}

// 3. ternary — one-line if/else
let label = age >= 18 ? "Adult" : "Minor";


// ═══════════════════════════════════════════
//  LOOPS
// ═══════════════════════════════════════════

// 4. for — known count
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0 1 2 3 4
}

// 5. while — unknown count
let n = 10;
while (n > 0) {
  console.log(n);
  n -= 3;          // 10 7 4 1
}

// 6. do...while — run at LEAST once
do {
  console.log("Hello!");  // runs once even if false
} while (false);

// 7. forEach — loop over arrays
["Alice","Bob","Charlie"].forEach((name, i) => {
  console.log(i + ": " + name);
});

// 8. for...of — cleaner array loop
for (let name of ["Alice","Bob"]) {
  console.log(name);
}


// ═══════════════════════════════════════════
//  JUMP STATEMENTS
// ═══════════════════════════════════════════

// 9. break — stop the loop immediately
for (let i = 0; i < 10; i++) {
  if (i === 5) break;      // stops at 5
  console.log(i);          // prints 0 1 2 3 4
}

// 10. continue — skip this iteration
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue;  // skip even
  console.log(i);              // prints 1 3 5
}

// 11. return — exit function with a value
function isAdult(age) {
  if (age >= 18) return true;   // exits here
  return false;                  // or here
}
```

---

## Homework

Write ALL of the following from scratch in your console:

```js
// 1. if/else — check a number
let num = 42;
if (num > 0) console.log("positive");
else if (num < 0) console.log("negative");
else console.log("zero");

// 2. for loop — sum 1 to 10
let sum = 0;
for (let i = 1; i <= 10; i++) { sum += i; }
console.log("Sum:", sum);  // 55

// 3. while — count down
let count = 5;
while (count > 0) { console.log(count); count--; }

// 4. break — find first number divisible by 7
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) { console.log("First:", i); break; }
}

// 5. continue — print only even numbers 1-10
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) continue;
  console.log(i);
}
```
