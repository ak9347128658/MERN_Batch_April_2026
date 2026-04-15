# Day 6: Arrays — The Real Workhorse

Hello students 👋

Welcome to Day 6! You've mastered loops and recursion. Now we level up to the **most used data structure in the world** — **Arrays**. 95% of real-world coding problems involve arrays in some way.

---

## 1. Introduction

### What we will learn today
- What is an array (properly, not just syntax)
- Traversing arrays
- Searching (linear & binary)
- Min, max, sum, average
- Reversing & rotating arrays
- Removing duplicates
- Kadane's algorithm (famous interview problem!)

### Why arrays?
- Every DB query result is an array.
- Every JSON API returns arrays.
- LeetCode has more array problems than any other topic.

---

## 2. Concept Explanation

### What is an array?
An **ordered list of values**, stored together, each with an index starting at `0`.

```js
let arr = [10, 20, 30, 40];
//          0   1   2   3   ← indexes
```

### Real-world analogy 🏢
Arrays are like **apartments in a building**. Each apartment has a **number (index)** and an **occupant (value)**. You can walk directly to apartment #2 without visiting #0 and #1 — that's called **random access**, and it's why arrays are super fast.

### The 3 operations you'll do 1000 times

| Operation | How | Speed |
|---|---|---|
| **Access** by index | `arr[2]` | O(1) — instant |
| **Search** for a value | loop through | O(n) |
| **Insert/delete** in middle | shift elements | O(n) |

---

## 3. Problem Solving Approach

For array problems:
**Step 1:** What do you need — a single value (sum, max) or a new array (filter, sort)?
**Step 2:** Single pass or nested pass? (nested = O(n²), avoid if possible)
**Step 3:** Any special trick? (two pointers, hash map, sorting first?)
**Step 4:** Code it and dry-run with a small array.

---

## 4. 💡 Visual Learning

### Traversing an array

```
arr = [10, 20, 30, 40, 50]
       ↑
       i=0 → read 10
          ↑
          i=1 → read 20
             ↑
             i=2 → read 30
                ...
```

### Two pointers technique

```
arr = [1, 2, 3, 4, 5]
       ↑           ↑
      left       right   ← move towards each other
```

---

## 5. 🔥 Coding Problems

### Problem 1 — Find max & min in array (Easy)

**Input:** `[3, 1, 8, 2, 9, 4]` → **Output:** `max=9, min=1`

```js
function findMaxMin(arr) {
  let max = arr[0], min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }
  return { max, min };
}

console.log(findMaxMin([3, 1, 8, 2, 9, 4])); // { max: 9, min: 1 }
```

**Pro tip:** Never start `max = 0` — what if all numbers are negative? Always start with `arr[0]`.

---

### Problem 2 — Sum and average (Easy)

```js
function sumAvg(arr) {
  let sum = 0;
  for (let num of arr) sum += num;
  return { sum, avg: sum / arr.length };
}

console.log(sumAvg([10, 20, 30, 40])); // { sum: 100, avg: 25 }
```

---

### Problem 3 — Linear search (Easy)

**Input:** `arr=[4,2,7,1,9], target=7` → **Output:** `index 2`

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1; // not found
}

console.log(linearSearch([4, 2, 7, 1, 9], 7)); // 2
console.log(linearSearch([4, 2, 7, 1, 9], 100)); // -1
```

---

### Problem 4 — Binary search (Interview must-know)

**Only works on SORTED arrays!** It cuts the array in half each step.

**Input:** `[1,3,5,7,9,11,13], target=9` → **Output:** `4`

```js
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1,3,5,7,9,11,13], 9)); // 4
```

**Speed:** For 1 million elements, linear search does 1M comparisons, binary does only ~20. 🚀

---

### Problem 5 — Reverse an array (Easy)

**Two-pointer technique:**

```js
function reverse(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // swap
    left++;
    right--;
  }
  return arr;
}

console.log(reverse([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
```

**Why two pointers?** Faster AND no extra memory — we modify in place.

---

### Problem 6 — Remove duplicates (Medium)

**Input:** `[1, 2, 2, 3, 4, 4, 5]` → **Output:** `[1, 2, 3, 4, 5]`

**Using Set (easy way):**
```js
function removeDupes(arr) {
  return [...new Set(arr)];
}
```

**Without Set (interview way):**
```js
function removeDupes(arr) {
  let result = [];
  for (let num of arr) {
    if (!result.includes(num)) result.push(num);
  }
  return result;
}

console.log(removeDupes([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
```

---

### Problem 7 — Rotate array by K (Interview classic)

**Input:** `arr=[1,2,3,4,5], k=2` → **Output:** `[4,5,1,2,3]` (right rotation)

```js
function rotate(arr, k) {
  k = k % arr.length; // handles k > length
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}

console.log(rotate([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
```

**Why `k % length`?** If `k = 7` and length = 5, rotating 7 times = rotating 2 times.

---

### Problem 8 — Second largest element (Interview)

**Input:** `[10, 20, 4, 45, 99, 99]` → **Output:** `45`

**Trick:** NOT just the 2nd biggest — it must be DIFFERENT from the biggest!

```js
function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second;
}

console.log(secondLargest([10, 20, 4, 45, 99, 99])); // 45
```

---

### Problem 9 — Move all zeros to end (Interview classic)

**Input:** `[0, 1, 0, 3, 12]` → **Output:** `[1, 3, 12, 0, 0]`

```js
function moveZeros(arr) {
  let pos = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[pos], arr[i]] = [arr[i], arr[pos]];
      pos++;
    }
  }
  return arr;
}

console.log(moveZeros([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
```

---

### Problem 10 — Two Sum (MOST asked interview question EVER)

**Input:** `arr=[2,7,11,15], target=9` → **Output:** `[0, 1]` (because arr[0]+arr[1]=9)

**Brute force (O(n²)):**
```js
function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j];
    }
  }
}
```

**Optimized with hash map (O(n)):**
```js
function twoSum(arr, target) {
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    let need = target - arr[i];
    if (need in map) return [map[need], i];
    map[arr[i]] = i;
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

**Interview tip:** Mentioning the hash map solution = instant respect.

---

### Problem 11 — Kadane's Algorithm — Max subarray sum (FAMOUS!)

**Input:** `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` → **Output:** `6` (from [4,-1,2,1])

**Idea:** At each step, choose — start fresh or continue the current sum?

```js
function maxSubarray(arr) {
  let maxSum = arr[0], current = arr[0];
  for (let i = 1; i < arr.length; i++) {
    current = Math.max(arr[i], current + arr[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}

console.log(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
```

**Why it's genius:** Solves in ONE pass. No nested loops!

---

### Problem 12 — Merge two sorted arrays (Medium)

**Input:** `[1,3,5], [2,4,6]` → **Output:** `[1,2,3,4,5,6]`

```js
function merge(a, b) {
  let result = [], i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}

console.log(merge([1, 3, 5], [2, 4, 6])); // [1,2,3,4,5,6]
```

This is the **merge step** used in Merge Sort — we'll see tomorrow!

---

## 🎯 Key Takeaways

1. Arrays use index-based **random access** — O(1).
2. **Two pointers** save you from nested loops.
3. **Hash maps** turn O(n²) into O(n).
4. **Kadane's algorithm** is a MUST-know interview pattern.

## Homework

1. Find the third largest element (handle duplicates).
2. Check if an array is a palindrome.
3. Merge two sorted arrays **without** extra space.

Tomorrow — **Sorting & Searching Deep Dive**! 🔍
