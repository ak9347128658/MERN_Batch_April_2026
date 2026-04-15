# Day 3: Advanced Loop Problems

Hello students 👋

Great to see you on Day 3! Now that you are comfortable with loops and patterns, it's time for the **classic interview problems** — reverse, palindrome, Armstrong, factorial, Fibonacci. These questions appear in **90% of junior interviews**.

---

## 1. Introduction

### What we will learn today
- Reverse a number
- Palindrome check
- Armstrong number
- Factorial (iterative)
- Fibonacci series (iterative)
- GCD / LCM
- Prime numbers in a range

### Why are these problems important?
These problems look simple, but they test:
- Your **math thinking**
- Your **digit manipulation** skills
- Your ability to **track multiple variables** in a loop

Master these → you crack 50% of first-round interviews.

---

## 2. Concept Explanation

### The two most powerful digit-tricks in JS

**Trick 1 — Get the LAST digit:**
```js
num % 10     // 4567 % 10 = 7
```

**Trick 2 — Remove the LAST digit:**
```js
Math.floor(num / 10)   // Math.floor(4567 / 10) = 456
```

### Real-world analogy 🪙
Think of a number like a **stack of coins**. `% 10` lets you look at the TOP coin. `/ 10` lets you REMOVE the top coin. Repeating these two moves, you can break any number apart.

---

## 3. Problem Solving Approach

For digit problems:
**Step 1:** Start with `while (num > 0)`.
**Step 2:** Peek last digit with `num % 10`.
**Step 3:** Do your math (add, build reverse, etc.).
**Step 4:** Remove digit with `num = Math.floor(num / 10)`.
**Step 5:** Repeat until num is 0.

---

## 4. 💡 Visual Learning

### Reverse of 123 — step by step

```
num=123  rev=0
  last=3  → rev = 0*10 + 3 = 3    → num=12
  last=2  → rev = 3*10 + 2 = 32   → num=1
  last=1  → rev = 32*10 + 1 = 321 → num=0 ✅
```

### Fibonacci visual

```
a    b    next
0    1    0+1=1
1    1    1+1=2
1    2    1+2=3
2    3    2+3=5
3    5    3+5=8
```

Each step, `a` moves to `b`, `b` moves to `next`. Two variables slide forward.

---

## 5. 🔥 Coding Problems

### Problem 1 — Reverse a number (Easy, most common!)

**Input:** `num = 1234`
**Output:** `4321`

**Dry run:** See the visual above.

```js
function reverse(num) {
  let rev = 0;
  while (num > 0) {
    let last = num % 10;      // get last digit
    rev = rev * 10 + last;    // build reverse
    num = Math.floor(num / 10); // remove last digit
  }
  return rev;
}

console.log(reverse(1234)); // 4321
console.log(reverse(100));  // 1  (note: leading zeros are lost, that's normal)
```

---

### Problem 2 — Palindrome number (Easy)

**Definition:** A number is a palindrome if it reads same forward and backward (e.g., 121, 1331).

**Input:** `121` → **Output:** `true`
**Input:** `123` → **Output:** `false`

**Thinking:** Reverse the number. If it equals the original → palindrome.

```js
function isPalindrome(num) {
  let original = num;
  let rev = 0;
  while (num > 0) {
    rev = rev * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return original === rev;
}

console.log(isPalindrome(121));  // true
console.log(isPalindrome(123));  // false
console.log(isPalindrome(7));    // true (single digit always palindrome)
```

---

### Problem 3 — Armstrong number (Interview favorite)

**Definition:** A number where the sum of each digit raised to the power of digit count equals the number.

**Example:** 153 → 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✅

**Steps:**
1. Count digits.
2. Loop through digits, add each raised to that power.
3. Compare with original.

```js
function isArmstrong(num) {
  let original = num;
  let n = num.toString().length; // digit count
  let sum = 0;

  while (num > 0) {
    let digit = num % 10;
    sum += Math.pow(digit, n);
    num = Math.floor(num / 10);
  }

  return sum === original;
}

console.log(isArmstrong(153));  // true
console.log(isArmstrong(9474)); // true (9⁴+4⁴+7⁴+4⁴)
console.log(isArmstrong(123));  // false
```

---

### Problem 4 — Factorial (Easy / Interview basic)

**Definition:** `n!` = 1 × 2 × 3 × ... × n.
**Example:** `5! = 120`

**Edge case:** `0! = 1` (by definition).

```js
function factorial(n) {
  if (n < 0) return "Not defined";
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
```

**Dry run for n=5:** result starts 1 → 1×1=1 → 1×2=2 → 2×3=6 → 6×4=24 → 24×5=120 ✅

---

### Problem 5 — Fibonacci series (Interview classic)

**Definition:** Each number = sum of previous two. Starts: 0, 1, 1, 2, 3, 5, 8, 13...

**Input:** `n = 7`
**Output:** `0 1 1 2 3 5 8`

```js
function fibonacci(n) {
  let a = 0, b = 1;
  for (let i = 1; i <= n; i++) {
    console.log(a);
    let next = a + b;
    a = b;
    b = next;
  }
}

fibonacci(7);
```

**Why only 2 variables?** We only need the LAST TWO numbers to calculate the next one. No need for arrays!

---

### Problem 6 — Nth Fibonacci number (Medium)

**Input:** `n = 6` → **Output:** `8` (sequence: 0, 1, 1, 2, 3, 5, 8 — the 6th index)

```js
function nthFib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let next = a + b;
    a = b;
    b = next;
  }
  return b;
}

console.log(nthFib(6)); // 8
console.log(nthFib(10)); // 55
```

---

### Problem 7 — Count digits and Sum of digits combined (Medium)

**Input:** `num = 4567`
**Output:** `{ count: 4, sum: 22 }`

```js
function analyze(num) {
  let count = 0, sum = 0;
  while (num > 0) {
    count++;
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return { count, sum };
}

console.log(analyze(4567)); // { count: 4, sum: 22 }
```

**Tip:** You can do MULTIPLE things in the same loop — it's more efficient than looping twice.

---

### Problem 8 — GCD of two numbers (Interview)

**Definition:** Greatest Common Divisor — biggest number that divides both.

**Example:** GCD(12, 18) = 6

**Euclidean algorithm (super fast):**
```js
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

console.log(gcd(12, 18)); // 6
console.log(gcd(100, 75)); // 25
```

**Dry run gcd(12, 18):**
- a=12, b=18 → temp=18, b = 12%18 = 12, a=18
- a=18, b=12 → temp=12, b = 18%12 = 6, a=12
- a=12, b=6 → temp=6, b = 12%6 = 0, a=6
- b=0, stop → return 6 ✅

---

### Problem 9 — LCM of two numbers (Medium)

**Formula:** `LCM(a, b) = (a × b) / GCD(a, b)`

```js
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log(lcm(12, 18)); // 36
```

**Why?** LCM × GCD always equals a × b. Clever math!

---

### Problem 10 — All primes from 1 to N (Interview)

**Input:** `n = 20`
**Output:** `2, 3, 5, 7, 11, 13, 17, 19`

```js
function primesTill(n) {
  for (let num = 2; num <= n; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;  // stop checking once you find a divisor
      }
    }
    if (isPrime) console.log(num);
  }
}

primesTill(20);
```

**Key optimization:** `break` saves time by exiting as soon as we find a divisor.

---

### Bonus Problem 11 — Power without `Math.pow` (Interview twist)

**Input:** `base = 2, exp = 10` → **Output:** `1024`

```js
function power(base, exp) {
  let result = 1;
  for (let i = 1; i <= exp; i++) {
    result *= base;
  }
  return result;
}

console.log(power(2, 10)); // 1024
console.log(power(5, 3));  // 125
```

**Edge case:** `power(anything, 0) === 1`. The loop doesn't run, result stays 1. 

---

### Bonus Problem 12 — Sum of digits until single digit (Medium)

**Input:** `9875`
**Output:** `2` (9+8+7+5 = 29 → 2+9 = 11 → 1+1 = 2)

```js
function digitalRoot(num) {
  while (num >= 10) {          // keep going while 2+ digits
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    num = sum;
  }
  return num;
}

console.log(digitalRoot(9875)); // 2
```

**Notice:** Loop INSIDE a loop — that's fine! Programming often needs this.

---

## 🎯 Key Takeaways

1. `% 10` and `/ 10` are your digit-surgery tools.
2. For Fibonacci, only track the LAST TWO values — save memory.
3. For primes, stop at `√n` and use `break` — massive speed up.
4. Edge cases to always check: `0`, `1`, negative numbers.

## Homework

1. Reverse a number **and** check if the reversed is itself prime.
2. Find all Armstrong numbers between 1 and 1000.
3. Print Fibonacci backwards up to nth term.

Tomorrow we enter a **magical world** — **Recursion**. Get ready! 🧠✨