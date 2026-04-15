# Day 9: Objects, Hash Maps & Sets

Hello students 👋

Today we learn the **single most useful data structure** in coding interviews: **hash maps** (in JS, just Objects and Maps). Once you see hash maps, you see them EVERYWHERE.

---

## 1. Introduction

### What we will learn today
- Objects as hash maps
- `Map` and `Set` — the modern ways
- Lookups in O(1)
- Frequency problems (a whole category!)
- Grouping & bucketing
- Classic hash-map interview problems

### Why hash maps?
Almost any "can you do this faster?" interview follow-up answer is: **use a hash map**. They turn O(n) lookups into O(1), and O(n²) problems into O(n).

---

## 2. Concept Explanation

### What is a hash map?
A **key-to-value** storage. You don't search through elements — you jump DIRECTLY to the key.

### Real-world analogy 📚
Think of a **dictionary**. If you want to know the meaning of "apple", you don't read every word — you jump straight to "A" section, find "apple", read its meaning. Instant. That's a hash map.

Another example: **a hotel's room key cabinet** — labeled by room number. Give me room 307's key? Takes 1 second — no searching.

### Object vs Map vs Set

```js
// Object (most common)
let obj = { name: "Hasan", age: 22 };
obj.name;              // "Hasan"
obj["age"];            // 22

// Map (better for dynamic keys, keeps insertion order)
let m = new Map();
m.set("name", "Hasan");
m.get("name");         // "Hasan"
m.has("name");         // true
m.size;                // 1

// Set (unique values only)
let s = new Set([1, 2, 2, 3]);
// s = {1, 2, 3}
s.has(2);              // true
```

---

## 3. Problem Solving Approach

Whenever you see these PHRASES in a problem, think HASH MAP:
- "Count occurrences of..."
- "Find duplicates..."
- "Group by..."
- "Does X exist in..."
- "Find two elements that sum to..."

---

## 4. 💡 Visual Learning

### Hash map lookup vs array search

```
ARRAY search for value 42:
  [5, 12, 42, 3, 9]  ← check 5, 12, 42 ... O(n)

HASH MAP lookup for key "user_42":
  {"user_42": ...}   ← jump directly  O(1)
```

### Frequency counting pattern

```
Input: "aabbc"
Step 1: a → { a:1 }
Step 2: a → { a:2 }
Step 3: b → { a:2, b:1 }
Step 4: b → { a:2, b:2 }
Step 5: c → { a:2, b:2, c:1 }
```

---

## 5. 🔥 Coding Problems

### Problem 1 — Count word frequencies (Easy)

**Input:** `"the cat sat on the mat the mat was soft"`
**Output:** `{ the: 3, cat: 1, sat: 1, on: 1, mat: 2, was: 1, soft: 1 }`

```js
function wordFreq(sentence) {
  let freq = {};
  for (let word of sentence.split(" ")) {
    freq[word] = (freq[word] || 0) + 1;
  }
  return freq;
}

console.log(wordFreq("the cat sat on the mat the mat was soft"));
```

---

### Problem 2 — Find duplicates in array (Easy)

**Input:** `[1,2,3,2,4,5,3]` → **Output:** `[2, 3]`

```js
function findDuplicates(arr) {
  let seen = new Set();
  let dupes = new Set();
  for (let n of arr) {
    if (seen.has(n)) dupes.add(n);
    else seen.add(n);
  }
  return [...dupes];
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 3])); // [2, 3]
```

---

### Problem 3 — Two Sum (revisit with hash map)

```js
function twoSum(arr, target) {
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let need = target - arr[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(arr[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

**O(n)** instead of O(n²). Always mention this optimization in interviews.

---

### Problem 4 — First repeating element (Interview)

**Input:** `[5, 3, 4, 3, 5, 6]` → **Output:** `5` (5 appears first AND repeats)

```js
function firstRepeating(arr) {
  let seen = new Set();
  let firstIdx = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (seen.has(arr[i])) firstIdx = i;
    else seen.add(arr[i]);
  }
  return firstIdx === -1 ? null : arr[firstIdx];
}

console.log(firstRepeating([5, 3, 4, 3, 5, 6])); // 5
```

---

### Problem 5 — Intersection of two arrays (Medium)

**Input:** `[1,2,2,1], [2,2]` → **Output:** `[2]`

```js
function intersect(a, b) {
  let setA = new Set(a);
  let result = new Set();
  for (let n of b) if (setA.has(n)) result.add(n);
  return [...result];
}

console.log(intersect([1, 2, 2, 1], [2, 2])); // [2]
```

---

### Problem 6 — Happy Number (Google interview)

**Definition:** Repeatedly replace a number by the sum of its digits squared. If it becomes 1 → happy. If it loops forever → not happy.

```js
function isHappy(n) {
  let seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let sum = 0;
    while (n > 0) {
      sum += (n % 10) ** 2;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n === 1;
}

console.log(isHappy(19)); // true (1² + 9² = 82 → 8²+2² = 68 → ... → 1)
console.log(isHappy(2));  // false
```

**Set tracks visited numbers** — cycle detection!

---

### Problem 7 — Group by property (Real-world)

```js
let users = [
  { name: "Ali", role: "admin" },
  { name: "Zara", role: "user" },
  { name: "Sam", role: "admin" }
];

function groupBy(arr, key) {
  let groups = {};
  for (let item of arr) {
    let k = item[key];
    (groups[k] = groups[k] || []).push(item);
  }
  return groups;
}

console.log(groupBy(users, "role"));
// { admin: [...], user: [...] }
```

---

### Problem 8 — Longest consecutive sequence (Interview TOUGH)

**Input:** `[100, 4, 200, 1, 3, 2]` → **Output:** `4` (1, 2, 3, 4)

```js
function longestConsecutive(arr) {
  let set = new Set(arr);
  let longest = 0;
  for (let n of set) {
    if (!set.has(n - 1)) {           // start of a sequence
      let current = n, count = 1;
      while (set.has(current + 1)) {
        current++;
        count++;
      }
      longest = Math.max(longest, count);
    }
  }
  return longest;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
```

**Trick:** Only start counting from numbers that are the START of a sequence (`n-1` doesn't exist).

---

### Problem 9 — Subarray sum equals K (FAANG favorite)

**Input:** `arr=[1,1,1], k=2` → **Output:** `2` (two subarrays sum to 2)

```js
function subarraySum(arr, k) {
  let map = new Map();
  map.set(0, 1);
  let sum = 0, count = 0;
  for (let n of arr) {
    sum += n;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2
```

**Prefix sum + hash map** — a legendary combo!

---

### Problem 10 — Isomorphic strings (Google)

**Definition:** Two strings are isomorphic if each character maps to a unique other char.

**Input:** `"egg", "add"` → `true`
**Input:** `"foo", "bar"` → `false`

```js
function isIsomorphic(a, b) {
  if (a.length !== b.length) return false;
  let mapAB = {}, mapBA = {};
  for (let i = 0; i < a.length; i++) {
    if (mapAB[a[i]] && mapAB[a[i]] !== b[i]) return false;
    if (mapBA[b[i]] && mapBA[b[i]] !== a[i]) return false;
    mapAB[a[i]] = b[i];
    mapBA[b[i]] = a[i];
  }
  return true;
}

console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false
```

---

### Problem 11 — Top K frequent elements (Amazon)

**Input:** `nums=[1,1,1,2,2,3], k=2` → **Output:** `[1, 2]`

```js
function topK(nums, k) {
  let freq = new Map();
  for (let n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(entry => entry[0]);
}

console.log(topK([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
```

---

### Problem 12 — Valid Sudoku row check (Bonus)

```js
function validRow(row) {
  let seen = new Set();
  for (let cell of row) {
    if (cell === ".") continue;
    if (seen.has(cell)) return false;
    seen.add(cell);
  }
  return true;
}

console.log(validRow(["5","3",".",".","7",".",".",".","."])); // true
console.log(validRow(["5","5",".",".","7",".",".",".","."])); // false
```

---

## 🎯 Key Takeaways

1. **Hash maps give O(1) lookup** — memorize this advantage.
2. Use **Set** for uniqueness, **Map** for key→value with any key type.
3. **Frequency counting** is a universal pattern — practice it 20 times.
4. **Prefix sum + hash map** solves subarray problems elegantly.

## Homework

1. Find the majority element (appears more than n/2 times).
2. Find all pairs in array with a given difference.
3. Check if string has all unique characters, without using Set.

Tomorrow — the **GRAND FINALE**: solving full interview rounds like a pro! 🏆
