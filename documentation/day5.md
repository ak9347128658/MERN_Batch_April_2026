## **Arrays** — one of the most used things in ALL of programming. Every app you've ever used — Instagram, Swiggy, YouTube — uses arrays to store lists of data.

Let me start with the simplest possible explanation:

> **An array is just a list.**

That's it. A shopping list. A list of students. A list of products. That's an array.

![alt](../images/javascript/day5/array_real_world_analogy.svg)

See that? Your shopping list is an array! The only weird thing — computers count from **0, not 1**. First item = index 0. Second item = index 1. Burn that into your brain forever.

---

## Lesson 1 — Creating Arrays & Accessing Items

[Click link to open Simulation for break, continue, return](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day5/array_creation_access_classroom.html)


Click every box — try typing index 10 and see what happens. The trick `students[students.length - 1]` always gives the last item no matter how big the array is.

---

## Lesson 2 — The Built-in Functions (Methods)

Now the real power. Arrays come with **built-in functions** (called methods). Think of them as **superpowers** already built into every array. Let me show you all of them:

![alt](../images/javascript/day5/array_methods_complete_map.svg)

5 categories of methods. We'll cover each one now with live animations. Let's go!

---

## Lesson 3 — Add & Remove Methods (push, pop, shift, unshift)

[Click link to open Simulation for break, continue, return](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day5/add_remove_methods_animated.html)

Click all 4 buttons! Watch items animate in and out. Push many items then pop them one by one. Notice how `unshift` makes everything shift right to make space at the front.

---

## Lesson 4 — The BIG 3: map, filter, reduce

These 3 methods are used in **every single React app and Node.js API**. Master these and you're a real developer:

![alt](../images/javascript/day5/map_filter_reduce_pipeline_diagram.svg)

Now let's use these on **real student data** — just like a real school app:

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day5/map_filter_reduce_student_lab.html)

Work through all 4 tabs! On **reduce** — press the button and watch it add scores one by one. On **chain** — drag the slider and see all 3 methods working together in a pipeline!

---

## Lesson 5 — Search Methods & Other Useful Methods

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day5/other_array_methods_lab.html)

Press every single button! Try `indexOf("cherry")` vs `indexOf("watermelon")`. Try all 3 sort modes — especially the number sort which needs `(a,b) => a-b`.

---

## Lesson 6 — Full Reference & Quick Revision Quiz

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day5/array_cheatcard_and_quiz.html)

Reference card has all 15 methods in one table. Quiz has 10 questions — go through all of them and read the explanations!

---

## The Complete Class Notes

```js
// ════════════════════════════════════════════
//  WHAT IS AN ARRAY?
//  An ordered list of items.
//  Counting starts at 0!
// ════════════════════════════════════════════

let fruits = ["mango", "apple", "banana"];

fruits[0]               // "mango"   (first)
fruits[2]               // "banana"  (third)
fruits[fruits.length-1] // "banana"  (last — always!)
fruits.length           // 3

// ─── ADD / REMOVE ───────────────────────────

fruits.push("grape")    // add to END   → ["mango","apple","banana","grape"]
fruits.pop()            // remove from END → returns "grape"

fruits.unshift("kiwi")  // add to START  → ["kiwi","mango","apple","banana"]
fruits.shift()          // remove from START → returns "kiwi"

// ─── THE BIG 3 ──────────────────────────────

// map — transform every item, same count
[1,2,3].map(n => n * 2)          // [2, 4, 6]

// filter — keep items that pass, fewer items
[1,2,3,4,5].filter(n => n > 3)   // [4, 5]

// reduce — collapse all to one value
[10,20,30].reduce((sum,n) => sum+n, 0)  // 60

// CHAINING — the real power!
students
  .filter(s => s.score >= 50)   // 1. keep who passed
  .map(s => s.name)             // 2. get names
  .join(", ");                  // 3. join to string

// ─── SEARCH ─────────────────────────────────

fruits.includes("apple")   // true
fruits.includes("cherry")  // false

fruits.indexOf("apple")    // 1 (position)
fruits.indexOf("cherry")   // -1 (not found)

[10,25,8].find(n => n > 15)  // 25 (first match)

// ─── LOOP ───────────────────────────────────

fruits.forEach((item, index) => {
  console.log(index + ": " + item);
});

for (let fruit of fruits) {
  console.log(fruit);
}

// ─── UTILITIES ──────────────────────────────

["b","a","c"].sort()              // ["a","b","c"]
[3,1,2].sort((a,b) => a - b)     // [1, 2, 3]
[1,2,3].reverse()                 // [3, 2, 1]
["Hi","World"].join(" ")          // "Hi World"
[1,2,3,4,5].slice(1, 4)          // [2, 3, 4]
```

---

## Class Homework

```js
// Paste each one in your console (F12) and run it:

// 1. Create an array of 5 of your favourite foods
const foods = ["biryani", "dosa", "pizza", "idli", "burger"];
console.log("First:", foods[0]);
console.log("Last:", foods[foods.length - 1]);
console.log("Count:", foods.length);

// 2. Add and remove items
foods.push("pasta");    // add to end
foods.unshift("chai");  // add to start
console.log(foods);
foods.pop();            // remove last
console.log(foods);

// 3. map — add "!" to every food name
const excited = foods.map(f => f + "!");
console.log(excited);

// 4. filter — only foods with more than 4 letters
const longNames = foods.filter(f => f.length > 4);
console.log(longNames);

// 5. reduce — total length of all names
const totalChars = foods.reduce((sum, f) => sum + f.length, 0);
console.log("Total characters:", totalChars);

// 6. search
console.log(foods.includes("dosa"));   // true or false?
console.log(foods.indexOf("pizza"));   // what position?

// 7. sort and join
const sorted = [...foods].sort();
console.log("Sorted:", sorted.join(" | "));
```

---

## Memory Tricks for This Class

| Trick | What to remember |
|---|---|
| **push/pop = END** | Push a book onto a PILE (end). Pop it off the TOP (end). |
| **shift/unshift = START** | Like a queue — shift out from FRONT |
| **map = same size** | Transform but keep count |
| **filter = smaller** | Keep only some |
| **reduce = one value** | Crush everything into one |
| **indexOf = -1 means NOT found** | -1 is the "not found" signal |
| **Index starts at 0** | Always 0, never 1! |

