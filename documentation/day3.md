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