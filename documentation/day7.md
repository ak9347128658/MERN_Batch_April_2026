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