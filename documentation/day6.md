# Day 6 — Objects, JSON & Classes in JavaScript

> **Objects and JSON are the backbone of the entire internet.**

Every API response you've ever seen. Every MongoDB document. Every React component's data. All of it is Objects and JSON.

Let me start with the simplest possible explanation:

> **An Object is like an ID card — it groups related information about ONE thing.**

![alt](../images/day6/object_id_card_analogy.svg)

See that? An ID card is a perfect object. Every piece of information has a **label (key)** and a **value**. In JavaScript we call them **key-value pairs**. That's ALL an object is.

---

# Part 1 — Objects

## What is an Object?

An **Object** is a non-primitive data type in JavaScript that stores a collection of **key-value pairs**. Each key (also called a **property name**) is a string, and its value can be any data type — string, number, boolean, array, another object, or even a function.

Objects let you group related data and behavior together under a single variable name, making your code organized and meaningful.

**Syntax:**
```js
const objectName = {
  key1: value1,
  key2: value2,
  key3: value3
};
```

---

## Lesson 1 — The Anatomy of an Object

![alt](../images/day6/object_anatomy_labeled.svg)

**5 things to remember:**
1. `{ }` — curly braces wrap the whole object
2. `name` — the key (the label)
3. `:` — colon separates key from value
4. `"Ali"` — the value (can be any type)
5. `,` — comma after every pair except the last

### Example Question 1

**Q: Create an object called `car` with properties `brand`, `model`, `year`, and `color`.**

**Solution:**
```js
const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2023,
  color: "White"
};

console.log(car);
// { brand: "Toyota", model: "Corolla", year: 2023, color: "White" }
```

### Example Question 2

**Q: What is wrong with the following object? Fix it.**
```js
const person = {
  name: "Sara"
  age: 25
  city: "Delhi"
}
```

**Solution:**
Missing commas after each key-value pair (except the last one):
```js
const person = {
  name: "Sara",   // comma added
  age: 25,        // comma added
  city: "Delhi"   // last one — no comma needed
};
```

---

## Lesson 2 — Creating Objects & Accessing Values

There are **two ways** to access values inside an object:

| Method | Syntax | When to use |
|---|---|---|
| **Dot notation** | `obj.key` | When you know the key name at coding time |
| **Bracket notation** | `obj["key"]` | When the key is stored in a variable, or has spaces/special characters |

```js
const student = { name: "Ali", age: 22, passed: true };

// Dot notation
student.name      // "Ali"

// Bracket notation
student["age"]    // 22

// When key is in a variable
let prop = "passed";
student[prop]     // true

// Key that doesn't exist
student.xyz       // undefined
```

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day6/object_create_access_live.html)

Click every property row. Then try typing `name`, `age`, `passed` in the dot notation box. Try `xyz` — watch what happens when a key doesn't exist!

### Example Question 3

**Q: Given the object below, access the `city` using both dot and bracket notation.**
```js
const user = { name: "Zara", age: 20, city: "Mumbai" };
```

**Solution:**
```js
// Dot notation
console.log(user.city);        // "Mumbai"

// Bracket notation
console.log(user["city"]);     // "Mumbai"

// Using a variable
let key = "city";
console.log(user[key]);        // "Mumbai"
```

### Example Question 4

**Q: What will be the output?**
```js
const book = { title: "JS Guide", pages: 300 };
console.log(book.author);
```

**Solution:**
```
undefined
```
The key `author` does not exist in the object, so JavaScript returns `undefined` (not an error).

---

## Lesson 3 — Modifying Objects (Add, Update, Delete)

Objects in JavaScript are **mutable** — you can change them after creation.

| Operation | Syntax | Description |
|---|---|---|
| **Update** | `obj.key = newValue` | Changes the value of an existing property |
| **Add** | `obj.newKey = value` | Adds a brand new property |
| **Delete** | `delete obj.key` | Removes a property entirely |

```js
const student = { name: "Ali", age: 22, city: "Hyderabad" };

// Update
student.age = 23;
console.log(student.age);   // 23

// Add
student.email = "ali@gmail.com";
console.log(student.email); // "ali@gmail.com"

// Delete
delete student.city;
console.log(student.city);  // undefined (removed)
```

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day6/object_crud_operations.html)

Try adding `email`, updating `age`, deleting `city`. Watch the object change live. Green = new, orange = updated!

### Example Question 5

**Q: Start with the object below. Add a `phone` property, update `name` to "Ahmed", and delete `country`. Print the final object.**
```js
const info = { name: "Ali", country: "India", age: 25 };
```

**Solution:**
```js
const info = { name: "Ali", country: "India", age: 25 };

info.phone = "9876543210";   // Add
info.name = "Ahmed";         // Update
delete info.country;         // Delete

console.log(info);
// { name: "Ahmed", age: 25, phone: "9876543210" }
```

---

## Lesson 4 — Object Methods (Functions Inside Objects)

### What is a Method?

A **method** is a function that is stored as a property of an object. It allows the object to "do something" — not just store data.

Inside a method, the keyword `this` refers to **the object that owns the method**.

```js
const student = {
  name: "Ali",
  age: 22,
  greet: function() {
    return "Hello, I am " + this.name;
  },
  isAdult() {                        // shorthand syntax (ES6)
    return this.age >= 18;
  }
};

student.greet()    // "Hello, I am Ali"
student.isAdult()  // true
```

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day6/object_methods_demo.html)

### Example Question 6

**Q: Create an object `calculator` with two numbers `a` and `b`, and methods `add()`, `subtract()`, and `multiply()` that return the results.**

**Solution:**
```js
const calculator = {
  a: 10,
  b: 5,
  add()      { return this.a + this.b; },
  subtract() { return this.a - this.b; },
  multiply() { return this.a * this.b; }
};

console.log(calculator.add());      // 15
console.log(calculator.subtract()); // 5
console.log(calculator.multiply()); // 50
```

### Example Question 7

**Q: What does `this` refer to inside a method?**

**Solution:**
`this` refers to the **object that called the method**. In the example below, `this` is the `person` object:
```js
const person = {
  name: "Sara",
  sayHi() {
    return "Hi, I'm " + this.name;   // this = person
  }
};
person.sayHi();  // "Hi, I'm Sara"
```

---

## Lesson 5 — Nested Objects (Objects Inside Objects)

### What is a Nested Object?

Real-world data is rarely flat. A user has an address. An address has a city. That means **objects inside objects**. You access nested values by chaining dot notation.

```js
const user = {
  name: "Ali",
  address: {
    city: "Hyderabad",
    pin: 500001,
    coordinates: {
      lat: 17.385,
      lng: 78.4867
    }
  }
};

// Accessing nested values
user.address.city                  // "Hyderabad"
user.address.pin                   // 500001
user.address.coordinates.lat       // 17.385
```

![alt](../images/day6/nested_objects_diagram.svg)

### Example Question 8

**Q: Create a `company` object with `name`, `ceo` (which is an object with `name` and `age`), and `location` (object with `city` and `country`). Access the CEO's name and the company's country.**

**Solution:**
```js
const company = {
  name: "TechCorp",
  ceo: {
    name: "Ravi Kumar",
    age: 45
  },
  location: {
    city: "Bangalore",
    country: "India"
  }
};

console.log(company.ceo.name);          // "Ravi Kumar"
console.log(company.location.country);  // "India"
```

---

## Lesson 6 — Looping Through Objects

Unlike arrays, objects don't have indexes. You need special methods to loop through them:

| Method | Returns | Example output |
|---|---|---|
| `for...in` | Keys one by one | `"name"`, `"age"`, `"city"` |
| `Object.keys(obj)` | Array of keys | `["name", "age", "city"]` |
| `Object.values(obj)` | Array of values | `["Ali", 22, "Hyderabad"]` |
| `Object.entries(obj)` | Array of [key, value] pairs | `[["name","Ali"], ["age",22]]` |

```js
const student = { name: "Ali", age: 22, city: "Hyderabad" };

// for...in loop
for (let key in student) {
  console.log(key + ": " + student[key]);
}
// name: Ali
// age: 22
// city: Hyderabad

// Object.keys
Object.keys(student);    // ["name", "age", "city"]

// Object.values
Object.values(student);  // ["Ali", 22, "Hyderabad"]

// Object.entries with forEach
Object.entries(student).forEach(([key, value]) => {
  console.log(key, "=>", value);
});
```

### Example Question 9

**Q: Given the object below, use `Object.entries()` to print each key-value pair in the format `"key = value"`.**
```js
const laptop = { brand: "Dell", ram: 16, storage: "512GB SSD" };
```

**Solution:**
```js
const laptop = { brand: "Dell", ram: 16, storage: "512GB SSD" };

Object.entries(laptop).forEach(([key, value]) => {
  console.log(key + " = " + value);
});
// brand = Dell
// ram = 16
// storage = 512GB SSD
```

---

## Lesson 7 — Spread Operator with Objects

### What is the Spread Operator?

The **spread operator (`...`)** lets you copy, merge, or update objects without modifying the original. This is used **every single day** in React and Node.js.

```js
const original = { name: "Ali", age: 22 };

// 1. Copy an object
const copy = { ...original };

// 2. Merge two objects
const extra = { city: "Hyderabad", score: 88 };
const merged = { ...original, ...extra };
// { name: "Ali", age: 22, city: "Hyderabad", score: 88 }

// 3. Update one property (creates a new object)
const updated = { ...original, age: 25 };
// { name: "Ali", age: 25 }
```

> **Important:** If both objects have the same key, the **last one wins**.

### Example Question 10

**Q: Merge these two objects. What happens to the `color` property?**
```js
const obj1 = { color: "Red", size: "M" };
const obj2 = { color: "Blue", price: 500 };
```

**Solution:**
```js
const merged = { ...obj1, ...obj2 };
console.log(merged);
// { color: "Blue", size: "M", price: 500 }
```
The `color` becomes `"Blue"` because `obj2` comes **after** `obj1` in the spread — the last value wins.

---

# Part 2 — JSON (JavaScript Object Notation)

## What is JSON?

> **JSON = JavaScript Object Notation. It's how computers send data to each other.**

When your phone app loads Instagram posts, when you call any API, when MongoDB returns data — it's ALL JSON.

**JSON is a text-based data format** used to transfer data between a server and a client (browser). It looks almost identical to a JavaScript object, but with stricter rules.

![alt](../images/day6/json_internet_flow_diagram.svg)

### JSON vs JavaScript Object — Key Differences

| Feature | JavaScript Object | JSON |
|---|---|---|
| Keys | Can be unquoted | **Must** be in `"double quotes"` |
| Values | Any JS type | String, number, boolean, array, object, `null` only |
| Functions | Allowed | **Not allowed** |
| `undefined` | Allowed | **Not allowed** |
| Single quotes | Allowed for strings | **Not allowed** — double quotes only |
| Trailing commas | Allowed | **Not allowed** |

**JavaScript Object:**
```js
const obj = { name: "Ali", age: 22, greet() { return "hi"; } };
```

**JSON equivalent:**
```json
{ "name": "Ali", "age": 22 }
```

Notice: no function, all keys in double quotes.

---

## JSON.stringify() and JSON.parse()

These two methods are the bridge between JavaScript objects and JSON strings:

| Method | What it does | Direction |
|---|---|---|
| `JSON.stringify(obj)` | Converts object to JSON string | Object → String (to **send**) |
| `JSON.parse(str)` | Converts JSON string to object | String → Object (to **receive**) |

```js
const student = { name: "Ali", age: 22, passed: true };

// Object → JSON string (to send to server/API)
const jsonString = JSON.stringify(student);
console.log(jsonString);
// '{"name":"Ali","age":22,"passed":true}'
console.log(typeof jsonString);  // "string"

// JSON string → Object (received from server/API)
const parsed = JSON.parse(jsonString);
console.log(parsed.name);       // "Ali"
console.log(typeof parsed);     // "object"
```

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day6/object_vs_json_live.html)

Press all 3 buttons! **Stringify** turns your object into a JSON string for sending. **Parse** turns the received string back into an object you can use. **See full cycle** shows the complete journey!

### Example Question 11

**Q: Convert the object to JSON, then parse it back. Verify the parsed result works.**
```js
const product = { name: "Phone", price: 15000, inStock: true };
```

**Solution:**
```js
const product = { name: "Phone", price: 15000, inStock: true };

// Step 1: Stringify
const json = JSON.stringify(product);
console.log(json);
// '{"name":"Phone","price":15000,"inStock":true}'

// Step 2: Parse
const back = JSON.parse(json);
console.log(back.name);     // "Phone"
console.log(back.price);    // 15000
console.log(back.inStock);  // true
```

### Example Question 12

**Q: Why does the function disappear when you stringify an object?**
```js
const obj = {
  name: "Ali",
  greet: function() { return "Hi"; }
};
const json = JSON.stringify(obj);
console.log(json);
```

**Solution:**
```
{"name":"Ali"}
```
The function `greet` disappears because **JSON does not support functions**. `JSON.stringify()` silently skips properties whose values are functions or `undefined`.

---

## The Full Mega Lab

[Click link to open Simulation](https://ak9347128658.github.io/MERN_Batch_April_2026/javascript/day6/object_json_mega_lab.html)

Go through every tab! The **Fake API** tab is especially important — drag the slider and watch real API responses appear. The **Spread & merge** tab shows patterns you'll use every single day in React and Node.js!

---

## Complete Object & JSON Notes

```js
// ════════════════════════════════════════════
//  OBJECT — a collection of key:value pairs
//  Think: ID card, user profile, product
// ════════════════════════════════════════════

// ─── CREATE ─────────────────────────────────
const student = {
  name:    "Ali Khan",     // string
  age:     22,             // number
  passed:  true,           // boolean
  score:   88,             // number
  skills:  ["JS","React"], // array inside object!
  address: {               // object inside object!
    city: "Hyderabad",
    pin:  500001
  },
  greet: function() {      // function inside object!
    return "Hello, I am " + this.name;
  }
};

// ─── ACCESS ─────────────────────────────────
student.name          // "Ali Khan"     (dot notation)
student["age"]        // 22             (bracket notation)
student.address.city  // "Hyderabad"    (nested)
student.skills[0]     // "JS"           (array in object)
student.greet()       // "Hello, I am Ali Khan" (method)

// ─── MODIFY ─────────────────────────────────
student.age = 23;           // update
student.email = "a@b.com";  // add new property
delete student.score;       // remove property

// ─── LOOP ───────────────────────────────────
for (let key in student) {
  console.log(key, student[key]);
}
Object.keys(student)     // ["name","age","passed",...]
Object.values(student)   // ["Ali Khan", 22, true, ...]
Object.entries(student)  // [["name","Ali"],["age",22],...]

// ─── SPREAD ─────────────────────────────────
const copy    = { ...student };               // copy
const merged  = { ...obj1, ...obj2 };         // merge
const updated = { ...student, age: 25 };      // update one

// ════════════════════════════════════════════
//  JSON — JavaScript Object Notation
//  How data travels over the internet
// ════════════════════════════════════════════

// Object → JSON string (to SEND data)
const jsonStr = JSON.stringify(student);
// '{"name":"Ali Khan","age":22,...}'

// JSON string → Object (when you RECEIVE data)
const obj = JSON.parse(jsonStr);
obj.name   // "Ali Khan"  — works like normal!

// ─── JSON RULES ─────────────────────────────
// ✓ Keys must be in "double quotes"
// ✓ Values: string, number, boolean, array, object, null
// ✕ No functions
// ✕ No undefined
// ✕ No single quotes
```

---

## Memory Tricks — Objects & JSON

| Concept | Simple way to remember |
|---|---|
| Object | Like an ID card — label and value for everything |
| `{ }` | Curly braces = object starts and ends |
| Key | The label (name, age, city) |
| Value | What's stored (any type) |
| Dot notation | `student.name` — use most of the time |
| Bracket notation | `student["name"]` — use when key is in a variable |
| `this` | Inside a method, `this` = the object itself |
| JSON | An object converted to plain text for sending |
| `JSON.stringify()` | Object → String (to send) |
| `JSON.parse()` | String → Object (to receive) |

---

**Homework — write all of this in your console:**

```js
// 1. Create YOUR profile as an object
const myProfile = {
  name: "Your Name",
  age: 20,
  city: "Hyderabad",
  skills: ["JavaScript", "HTML", "CSS"],
  address: { area: "Banjara Hills", pin: 500034 }
};

// 2. Access values
console.log(myProfile.name);
console.log(myProfile.skills[0]);
console.log(myProfile.address.area);

// 3. Add and update
myProfile.email = "you@gmail.com";
myProfile.age = 21;
console.log(myProfile);

// 4. Loop through it
Object.entries(myProfile).forEach(([k, v]) => {
  console.log(k + ":", v);
});

// 5. JSON round trip
const json = JSON.stringify(myProfile);
console.log("JSON:", json);
const back = JSON.parse(json);
console.log("Parsed back:", back.name);
```

---
