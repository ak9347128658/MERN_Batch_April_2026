# Day 8: String Mastery

Hello students 👋

Strings are EVERYWHERE — names, emails, passwords, URLs, JSON, chat messages. Today we make you a **string expert**. By the end, you'll handle any string question confidently.

---

## 1. Introduction

### What we will learn today
- String as a sequence of characters
- Character ASCII tricks
- Reverse, palindrome, anagram
- Frequency counting with hash maps
- Substring problems
- Sliding window technique
- Pattern matching

### Why strings?
- Backend: parse input, validate email/password.
- Frontend: display/format user text.
- Interviews: frequency counting is **the most common** mid-level question.

---

## 2. Concept Explanation

### Strings are like arrays (with a few limits)
```js
let s = "hello";
console.log(s[0]);       // "h"
console.log(s.length);   // 5
// BUT you CAN'T do: s[0] = "H"   ← strings are immutable!
```

### Real-world analogy ✉️
A string is like a **sentence written in stone** — you can READ any letter, but you can't change it. To modify, you must create a NEW sentence. That's why we often do `s = s + "x"` — we build a new string.

### ASCII trick — every character has a secret number

```js
"a".charCodeAt(0);   // 97
"A".charCodeAt(0);   // 65
"0".charCodeAt(0);   // 48
String.fromCharCode(97); // "a"
```

This lets you:
- Check if char is letter/digit
- Convert uppercase/lowercase manually
- Hash a string using numbers

---

## 3. Problem Solving Approach

For string problems:
**Step 1:** Is the comparison case-sensitive?
**Step 2:** Are whitespaces/symbols allowed?
**Step 3:** Do you need character counts? → hash map.
**Step 4:** Is it about a "window" of chars? → sliding window.

---

## 4. 💡 Visual Learning

### Sliding window

```
Find max sum of 3 consecutive chars' ASCII:

s = "abcdef"
[a b c] d e f   sum1
 a[b c d]e f    sum2 (remove a, add d)
 a b[c d e]f    sum3 (remove b, add e)
 a b c[d e f]   sum4 (remove c, add f)
```

Each step: **remove left, add right** — O(1) per step!

---

## 5. 🔥 Coding Problems

### Problem 1 — Reverse a string (Easy warm-up)

```js
function reverse(s) {
  return s.split("").reverse().join("");
}

// Without built-ins (interview version)
function reverse(s) {
  let r = "";
  for (let i = s.length - 1; i >= 0; i--) r += s[i];
  return r;
}

console.log(reverse("hello")); // "olleh"
```

---

### Problem 2 — Check palindrome string (Easy)

**Input:** `"madam"` → `true`

```js
function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```

**Two pointers** — classic technique.

---

### Problem 3 — Count vowels and consonants (Easy)

```js
function countVowels(s) {
  const vowels = "aeiouAEIOU";
  let v = 0, c = 0;
  for (let ch of s) {
    if (/[a-zA-Z]/.test(ch)) {
      if (vowels.includes(ch)) v++;
      else c++;
    }
  }
  return { vowels: v, consonants: c };
}

console.log(countVowels("Hello World")); // { vowels: 3, consonants: 7 }
```

---

### Problem 4 — Character frequency (Interview classic)

**Input:** `"programming"` → `{ p:1, r:2, o:1, g:2, a:1, m:2, i:1, n:1 }`

```js
function charFreq(s) {
  let freq = {};
  for (let ch of s) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}

console.log(charFreq("programming"));
```

**Hash map pattern** — you'll use this EVERY DAY as a programmer.

---

### Problem 5 — First non-repeating character (Amazon / Microsoft)

**Input:** `"leetcode"` → `"l"`
**Input:** `"aabb"` → `null`

```js
function firstUnique(s) {
  let freq = {};
  for (let ch of s) freq[ch] = (freq[ch] || 0) + 1;
  for (let ch of s) if (freq[ch] === 1) return ch;
  return null;
}

console.log(firstUnique("leetcode"));  // "l"
console.log(firstUnique("aabb"));      // null
```

**Two passes**: one to count, one to find the first with count === 1.

---

### Problem 6 — Check anagram (Interview favorite)

**Definition:** Two strings are anagrams if they have the same letters in any order.

**Input:** `"listen", "silent"` → `true`

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  let freq = {};
  for (let ch of a) freq[ch] = (freq[ch] || 0) + 1;
  for (let ch of b) {
    if (!freq[ch]) return false;
    freq[ch]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
```

**Alternative:** Sort both and compare — simpler but O(n log n).

---

### Problem 7 — Remove duplicate characters (Medium)

**Input:** `"programming"` → `"progamin"`

```js
function removeDup(s) {
  let seen = new Set();
  let result = "";
  for (let ch of s) {
    if (!seen.has(ch)) {
      seen.add(ch);
      result += ch;
    }
  }
  return result;
}

console.log(removeDup("programming")); // "progamin"
```

---

### Problem 8 — Longest substring without repeating (FAMOUS sliding window)

**Input:** `"abcabcbb"` → **Output:** `3` (the "abc" part)

```js
function longestUnique(s) {
  let set = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}

console.log(longestUnique("abcabcbb")); // 3
console.log(longestUnique("bbbbb"));    // 1
console.log(longestUnique("pwwkew"));   // 3
```

**Sliding window** in action — a MUST-know pattern.

---

### Problem 9 — Reverse words in a sentence (Medium)

**Input:** `"Hello World JavaScript"` → `"JavaScript World Hello"`

```js
function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(" ");
}

console.log(reverseWords("  Hello   World JavaScript  "));
// "JavaScript World Hello"
```

**Edge cases handled:** leading/trailing spaces, multiple spaces.

---

### Problem 10 — String compression (Interview)

**Input:** `"aaabbc"` → `"a3b2c1"`

```js
function compress(s) {
  let result = "", count = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) count++;
    else {
      result += s[i] + count;
      count = 1;
    }
  }
  return result;
}

console.log(compress("aaabbc")); // "a3b2c1"
```

---

### Problem 11 — Valid palindrome ignoring case & symbols (LeetCode popular)

**Input:** `"A man, a plan, a canal: Panama"` → `true`

```js
function validPalin(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left++] !== s[right--]) return false;
  }
  return true;
}

console.log(validPalin("A man, a plan, a canal: Panama")); // true
```

---

### Problem 12 — Longest common prefix (Interview)

**Input:** `["flower","flow","flight"]` → `"fl"`

```js
function longestPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

console.log(longestPrefix(["flower", "flow", "flight"])); // "fl"
```

---

### Problem 13 — Group anagrams (Medium)

**Input:** `["eat","tea","tan","ate","nat","bat"]`
**Output:** `[["eat","tea","ate"],["tan","nat"],["bat"]]`

```js
function groupAnagrams(strs) {
  let map = {};
  for (let s of strs) {
    let key = s.split("").sort().join("");
    (map[key] = map[key] || []).push(s);
  }
  return Object.values(map);
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
```

**Trick:** Sorted version of each string is a **unique key** for anagrams.

---

## 🎯 Key Takeaways

1. **Strings are immutable** — build a new one rather than modify.
2. **Frequency map** solves 50% of string problems.
3. **Two pointers** — for palindromes and reversals.
4. **Sliding window** — for "longest/shortest substring" problems.

## Homework

1. Check if two strings are rotations of each other.
2. Find the longest palindromic substring.
3. Count how many words in a string start with a vowel.

Tomorrow — **Objects and Hash Maps** — the most useful data structure! 🗝️
